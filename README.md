# Run in a container

 ### Requirements

 - [Docker](https://www.docker.com/)

Open a Terminal:
- Windows: Use Git Bash, PowerShell, or Command Prompt.
- Mac/Linux: Use the default terminal.

Run:
<pre>
<code>git clone https://github.com/Jamie-Andrews1/Restaurant-review-app.git
cd Restaurant-review-app</code>
</pre>

Create a .env file in the same directory and create your own variables:
<pre>
<code>DATABASE="myDatabaseName"
USER_ID="myUser"
PASSWORD="myPassword"</code>
</pre>

Start services:
<pre>
<code>docker compose up -d --build</code>
</pre>

Access app at [http://localhost:80](http://localhost:80)

Clean up:
<pre>
<code>docker compose down --volumes</code>
</pre>
