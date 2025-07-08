# Run in a container

 ### Requirements

 - [Docker](https://www.docker.com/)

Open a terminal and run:
<pre>
  <code>
 git clone Jamie-Andrews1/Restaurant-review-app
 cd Restaurant-review-app
    </code>
</pre>

Start services:
<pre>
  <code>
docker compose up -d
</code>
</pre>

Access app at [http://localhost:80](http://localhost:80)

Clean up:
<pre>
  <code>
    docker compose down --volumes
  </code>
</pre>
