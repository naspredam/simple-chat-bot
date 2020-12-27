FROM python:3.9.1

RUN adduser --disabled-password --gecos '' app-user

COPY --chown=app-user . /home/app-user/

EXPOSE 5000
USER app-user
WORKDIR /home/app-user

RUN pip install -r requirements.txt
RUN python train.py || echo 0

CMD python api.py