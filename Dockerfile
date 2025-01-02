# STAGE 1: build static UI
FROM node:20.17.0-alpine AS builder

COPY ./static/ /app/

WORKDIR /app

RUN yarn install --immutable

RUN yarn vite build


# STAGE 2: run the server
FROM python:3.12-alpine

COPY ./server/requirements.txt /app/server/requirements.txt
RUN pip install -r requirements.txt

COPY ./server/ /app/server/

WORKDIR /app/server

COPY --from=builder /app/dist/ /app/static/dist/

RUN pip install gunicorn

EXPOSE 5000

ENV FLASK_APP='app.py'
ENV PYTHONPATH='.'

# ENTRYPOINT ["python"]
CMD [ "gunicorn", "-b", "0.0.0.0:5000" ,"gunicorn-app:create_app_for_prod()" ]
