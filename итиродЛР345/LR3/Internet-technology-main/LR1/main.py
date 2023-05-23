import socket
import struct
import json
import random


def run_requester():
    requester = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    requester.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    requester.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    requester.settimeout(1.0)
    requester.bind(('', 25565))
    return requester


def run():
    chat = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    chat.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    chat.settimeout(1.0)
    chat.bind(('', 27015))
    return chat


def send_message(name, chat, group):
    message = input("Введите сообщение(или !q для выхода): ")
    if message == '!q':
        return message
    message = name + ': ' + message
    print('\n')
    print(message)
    chat.sendto(str.encode(message), group)


def get_messages(chat):
    messages = []
    while True:
        message = get_message(chat)
        if message == 0:
            break
        else:
            message = message.decode("utf-8")
            messages.append(message)
    if len(messages) == 0:
        print("У вас нет новых сообщений.")
    else:
        print(f"У вас {len(messages)} непрочитанных сообщений")
        print(*messages, sep='\n')


def get_message(chat):
    try:
        data, addr = chat.recvfrom(1024)
    except socket.timeout:
        return 0
    else:
        return data


def load_groups():
    groups = 0
    ips = []
    with open('groups.json', 'r') as f:
        groups = json.load(f)
    for group in groups:
        ips.append(group['ip'])
    return ips


def generate_ip():
    groups = load_groups()
    ip = '224.5.2.1'
    while ip in groups:
        ip = [random.randint(224, 231), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)]
        ip = list(map(str, ip))
        ip = ".".join(ip)
    return ip


def create_group(login):
    ip = generate_ip()
    names = []
    with open('groups.json', 'r') as f:
        groups = json.load(f)
    for group in groups:
        names.append(group['name'])
    while True:
        name = input("Введите имя группы: ")
        if name in names:
            print("Группа с таким названием уже существует, придумайте новое.")
        else:
            break
    users = [login]
    group = {'ip': ip, 'name': name, "host": login, "users": users}
    with open('groups.json', 'r') as f:
        groups = json.load(f)
    groups.append(group)
    with open('groups.json', 'w') as outfile:
        json.dump(groups, outfile)

def choose_group(login, group_chosen):
    with open('groups.json', 'r') as f:
        groups = json.load(f)
    visible_groups = []
    for group in groups:
        if login in group['users']:
            visible_groups.append(group['name'])
    if len(visible_groups) == 0:
        print("Извините, но у вас нет доступных групп, создайте свою либо отправьте запрос на присоединение.")
        return
    print(*visible_groups, sep='\n')
    while True:
        print("Напишите имя группы для подключения: ")
        name = input()
        if group_chosen:
            if name == group_chosen['name']:
                print("Вы уже подключены к этой группе, выберите другую.")
                continue
        if name in visible_groups:
            for group in groups:
                if name == group['name']:
                    return group
        else:
            print("Некорректное имя. Попробуйте еще раз")


def connect_to_group(chat, ip):
    print(ip)
    gr = socket.inet_aton(ip)
    mr = struct.pack('4sL', gr, socket.INADDR_ANY)
    chat.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mr)


def create_request(login, requester):
    with open('groups.json', 'r') as f:
        groups = json.load(f)
    non_groups = []
    for group in groups:
        if login not in group['users']:
            non_groups.append(group['name'])
    if len(non_groups) == 0:
        print("Вы уже состоите во всех группах!")
        return
    print(*non_groups, sep='\n')
    while True:
        print("Напишите имя группы для подключения")
        name = input()
        if name in non_groups:
            print(groups)
            for group in groups:
                if name == group['name']:
                    request = login + " " + group['host'] + " " + group['name']
                    requester.sendto(str.encode(request), ('<broadcast>', 25565))
                    return
        else:
            print("Некорректное имя. Попробуйте еще раз")


def accept_request(login, requester):
    with open('groups.json', 'r') as f:
        groups = json.load(f)
    while True:
        try:
            request, addr = requester.recvfrom(1024)
        except socket.timeout:
            break
        else:
            request = request.decode("utf-8")
            print(request)
            requestor, admin, name_group = request.split(' ', 2)
            if admin == login:
                print(f"{requestor} хочет присоединиться к вашей группе {name_group}")
                print("Yes - для того чтоб принять, другие символы - отклонить")
                action = input()
                if action == "Yes":
                    for group in groups:
                        if group['name'] == name_group:
                            group['users'].append(requestor)
                            break
    with open('groups.json', 'w') as outfile:
        json.dump(groups, outfile)


def group_chat(chat, login, requester):
    group = None
    while True:
        print('1. Создать группу')
        print('2. Выбрать группу')
        print('3. Запрос на вход в группу')
        print('4. Принять запросы')
        print('0. Главное меню')
        action = input('Действие: ')
        if action == "1":
            create_group(login)
        elif action == "2":
            group = choose_group(login, group)
            if group:
                print(f"Вы подключились к группе {group['name']}")
                connect_to_group(chat, group['ip'])
        elif action == "3":
            create_request(login, requester)
        elif action == "4":
            accept_request(login, requester)
        elif action == "0":
            if group:
                return group
            return
        else:
            print("Такого действия не существует :(")


def main(chat, requester):
    name = input("Как тебя зовут?: ")
    group = None
    print(f"Привет {name}!")
    while True:
        print(f"Выбери, что хочешь сделать: ")
        print("1. Написать сообщение.")
        print("2. Просмотреть входящие.")
        print("3. Групповой чат")
        print("0. Закрыть чат-программу")
        action = input("Действие: ")
        if action == "1":
            if group:
                while True:
                    message = send_message(name, chat, group)
                    if message == '!q':
                        break
            else:
                print("Пожалуйста подключитесь сначала к группе.")
        elif action == "2":
            if group:
                get_messages(chat)
            else:
                print("Вы еще не присоединились ни к одной из групп. Перейдите сперва в раздел группового чата.")
        elif action == "3":
            group = group_chat(chat, name, requester)
            if group:
                group = (group['ip'], 27015)
        elif action == "0":
            return
        else:
            print("Такого действия не существует :(")



if __name__ == '__main__':
    requester = run_requester()
    chat = run()
    main(chat, requester)


