all:
	docker build --no-cache -t pabragin/soshace .
clean:
	docker rmi -f pabragin/soshace
stop:
	docker stop $$(docker ps -a -q)
run:
	docker run -d -p 80:80 -p 8080:8080 pabragin/soshace
