# API Service - Questions & Answers
<br />
<p align="center">
  <h1 align="center">Alligator System Design</h1>

  <p align="center">
    Custom-built RESTful API to support server and database operations for a high-end fashion website that can scale to meet the demands of production traffic.

# About
I was tasked with re-engineering the backend of the "Questions and Answers" service of a fashion website frontend. I:
  * Constructed RESTful API to handle requests to a database system of my own choosing
  * Performed an ETL (Extract, Transform, Load) process on a raw data set consisting of over twelve million records
  * Designed and build an API server to provide data to the client in the format specified by the API documentation
  * Optimized database and query methods for speed and response
  * Deployed to the cloud using AWS
  * Stress tested all API routes, checking for RPS (requests per second), latency, and error rate

The final product, when tested with <a href="https://loader.io">loader.io</a> with a maximum of 600 users per second, registered an average response time of 12 ms with a 0.0% error rate.

![](./loaderData.png)


# Stack

<table>
  <tbody>
    <tr>
      <th>Programming Languages</th>
      <td>
        <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
        <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Tools & Technologies</th>
      <td>
        <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/>
        <img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>
        <img alt="Redis" src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white">
        <img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
      </td>
    </tr>
    <tr>
      <th>Utilities</th>
      <td>
        <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" />
        <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
      </td>
    </tr>
     <tr>
      <th>Workflow</th>
      <td>
        <img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
        <img alt="Trello" src="https://img.shields.io/badge/Trello-%23026AA7.svg?&style=for-the-badge&logo=Trello&logoColor=white"/>
        <img alt="Discord" src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <th>Deployment</th>
      <td>
        <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?&style=for-the-badge&logo=amazon-aws&logoColor=white"/>
      </td>
    </tr>
  </tbody>
</table>

# Workflow
Our team used Agile workflow for this project.

## Trello
A Trello board was used to create and track tickets. We held daily standup meetings to discuss accomplishments, challenges, and upcoming tickets. We utilitized Discord in order to maintain effective remote collaboration and allow for quick communication when necessary.

## Version Control
We utilized Git Feature Branch workflow.

# Development

## Repo
`git clone https://github.com/HRATX58-SDC-TeamAlligator/questions-answers.git`

## Install
`npm install`

## Start Scripts
`npm start`

## Install Postgres
<a href="https://brew.sh/">Install Homebrew</a>

`brew install postgres`

<a href="https://www.postgresql.org/download/">Postgres Documentation</a>
