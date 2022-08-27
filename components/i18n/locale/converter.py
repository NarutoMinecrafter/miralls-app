from traceback import format_exc
from loguru import logger
from time import sleep
import hashlib
import pathlib
import json
import yaml
import os


BASE_PATH = pathlib.Path(__file__).parent.absolute()
files = {}


def hash_file(filename: str) -> str:
    h = hashlib.sha1()
    with open(filename, 'rb') as file:
        chunk = 0
        while chunk != b'':
            chunk = file.read(1024)
            h.update(chunk)
    return h.hexdigest()


def get_yaml_files() -> list:
    return [filename for filename in os.listdir(BASE_PATH) if filename.endswith('.yml') or filename.endswith('.yaml')]


def yaml_file_to_json_file(yaml_file: str) -> str:
    # Получаем данные
    with open(yaml_file, 'r', encoding='UTF-8') as f:
        data = yaml.load(f.read(), yaml.Loader)

    data = data or dict()

    # Сохраняем JSON-файл
    json_file = yaml_file.replace('.yml', '.json').replace('.yaml', '.json')
    with open(json_file, 'w+', encoding='UTF-8') as f:
        f.write(json.dumps(data, indent=4))

    return json_file


def main():
    while True:
        try:
            # Перебираем все YAML-файлы в директории
            for filename in get_yaml_files():

                # Получаем SHA1 хэш файла
                hash_of_file = hash_file(filename)

                # Если работали с этим файлом ранее
                if filename in files:

                    # Проверяем, совпадают ли хэши
                    if files[filename] == hash_of_file:
                        continue
                    # Хэши не совпадают
                    else:
                        pass

                files[filename] = hash_of_file
                # Конвертируем
                try:
                    json_file = yaml_file_to_json_file(filename)
                except yaml.scanner.ScannerError:
                    logger.error(format_exc())
                    continue
                logger.info('Saved! %s -> %s' % (filename, json_file))

            sleep(.5)
        except KeyboardInterrupt:
            exit()


if __name__ == '__main__':
    main()
