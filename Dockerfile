FROM node:12.18.1

# directory where the source code is uploaded
WORKDIR /submission

COPY package.json /submission/package.json

RUN npm install

COPY . /submission/

CMD ["bash", "-c", "node index.js"]
