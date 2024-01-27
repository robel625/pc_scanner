# FROM python:3.10-alpine
# ENV PYTHONUNBUFFERED 1
# WORKDIR /django
# COPY requirements.txt requirements.txt
# RUN pip3 install -r requirements.txt
# COPY . .


# FROM python:3.10-alpine
# WORKDIR /usr/src/app
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1
# RUN pip install --upgrade pip
# COPY ./requirements.txt .
# RUN pip install -r requirements.txt
# COPY . .

FROM python:3.10-alpine
WORKDIR /usr/src/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# COPY ./requirements.txt .
# COPY ./entrypoint.sh .
COPY . .
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt 

# RUN chmod +x ./entrypoint.sh


# CMD [ "entrypoint.sh" ]

COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]