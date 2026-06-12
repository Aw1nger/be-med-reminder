FROM oven/bun:latest AS builder
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --production

COPY . .

RUN bun build src/index.ts \
    --compile \
    --target bun \
    --minify-whitespace \
    --minify-syntax \
    --outfile server

FROM gcr.io/distroless/base:latest
WORKDIR /app
COPY --from=builder /app/server .

CMD ["./server"]
