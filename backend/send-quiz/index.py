import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Отправляет результат квиза в Telegram личные сообщения."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))

    clean_type = body.get('cleanType', '—')
    room_type = body.get('roomType', '—')
    area = body.get('area', '—')
    date = body.get('date', '—')
    name = body.get('name', '—')
    phone = body.get('phone', '—')

    text = (
        f"📋 *Новая заявка с сайта*\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}\n"
        f"🧹 Тип уборки: {clean_type}\n"
        f"🏠 Помещение: {room_type}\n"
        f"📐 Площадь: {area} м²\n"
        f"📅 Дата: {date}"
    )

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }).encode()

    req = urllib.request.Request(
        f'https://api.telegram.org/bot{bot_token}/sendMessage',
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': result.get('ok', False)})
    }
