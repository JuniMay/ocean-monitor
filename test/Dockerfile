# Use the official Python base image
FROM python:3.9

# Set the working directory
WORKDIR /locust

# Copy the requirements file and install dependencies
COPY ./requirements.txt ./requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

# Copy the Locust script to the working directory
COPY load_test.py load_test.py

# Expose Locust web interface port
EXPOSE 8089

# Set the command to run Locust with the specified locustfile
CMD ["locust", "-f", "load_test.py", "--host=http://server:5000"]
