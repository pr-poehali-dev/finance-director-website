import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, EmailStr, Field

class ConsultationRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., min_length=5)
    message: str = Field(..., min_length=10)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявки на консультацию на email финансового директора
    Args: event - dict с httpMethod, body (JSON с name, email, phone, message)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict со статусом отправки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    request_data = ConsultationRequest(**body_data)
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на консультацию от {request_data.name}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    
    html_body = f'''
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #1a1a2e;">Новая заявка на консультацию</h2>
        <p><strong>Имя:</strong> {request_data.name}</p>
        <p><strong>Email:</strong> {request_data.email}</p>
        <p><strong>Телефон:</strong> {request_data.phone}</p>
        <p><strong>Сообщение:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #c9a96e;">
          {request_data.message}
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Заявка отправлена через форму сайта CFO Portfolio
        </p>
      </body>
    </html>
    '''
    
    html_part = MIMEText(html_body, 'html', 'utf-8')
    msg.attach(html_part)
    
    server = smtplib.SMTP()
    server.connect(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Заявка успешно отправлена',
            'request_id': context.request_id
        }),
        'isBase64Encoded': False
    }