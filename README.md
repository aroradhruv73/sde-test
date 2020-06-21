# SDE Online Assessment

docker build -t sde .

docker run -v $(pwd)/dist:/submission/dist sde node index.js ./dist/input/sample_input.json ./dist/output/output.json