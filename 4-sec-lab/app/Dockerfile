# 1. Base image
FROM node:20-alpine

# 2. Sets the execution path inside the container
WORKDIR /usr/src/app

# 3. Layer Caching optimization: Copy package manifests first
COPY package.json ./

# 4. Dependency installation
RUN npm install --omit=dev && npm cache clean --force

# 5. Application deployment: Copy the rest of the application source code
COPY --chown=node:node . .

# 6. Documents the container listens on port 3000 at runtime
EXPOSE 3000

# 7. Run without root privileges
USER node

# 8. Immutable binary execution for the container
ENTRYPOINT ["node"]

# 9. Default args passed to ENTRYPOINT (can be overridden at runtime)
CMD ["server.js"]
