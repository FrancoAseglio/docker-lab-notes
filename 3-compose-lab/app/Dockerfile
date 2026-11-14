# 1. Base image
FROM node:22-alpine

# 2. Sets the execution path inside the container
WORKDIR /usr/src/app

# 3. Layer Caching optimization: Copy package manifests first
COPY package.json package-lock.json ./

# 4. Dependency installation
RUN npm ci --omit=dev

# 5. Application deployment: Copy the rest of the application source code
COPY . .

# 6. Documents the container listens on port 3000 at runtime
EXPOSE 3000

# 7. Immutable binary execution for the container
ENTRYPOINT ["node"]

# 8. Default args passed to ENTRYPOINT (can be overridden at runtime)
CMD ["server.js"]
