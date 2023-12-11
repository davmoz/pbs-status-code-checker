# Use Nginx as the base image
FROM nginx:alpine

# Copy the HTML, CSS, and JavaScript files to the Nginx server directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
