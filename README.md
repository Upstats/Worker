## About UpStats

There are many great Opensource, Hosted Solutions for Status Page, however, I didn't find one that really suit my needs so we created this enhanced one. I want to create a Status Page so amazing that it'll be the last one you ever need. I think this is the One.

Here's why:
* Managing your site's right from your Mobile is now easier with Mobile First Dashboard.
* You don't need to do the task, you can appoint others to do your Tasks.
* Let your user to know about your System Status directly via Email.
* Don't let your Telegram Bots simply Down

Since your needs maybe different.So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have have contributed to expanding UpStats!

## Built with

* [Tailwind](https://tailwindcss.com)
* [NextJS](https://nextjs.org/)
* [Typescript](https://www.typescriptlang.org)
* [GramJS](https://github.com/gram-js/gramjs)

## Getting Started

1. Deploy [UpStats](https://gitHub.com/upstats/upstats#getting-started)

2. Clone the Repo
```
git clone https://github.com/UpStats/Worker.git
```
3. Open /config/default.json file and replace with your Details
```
db - Get DB URL from MongoDB.com
```
4. If you want to enable Email Subscription set ```mail_service_enabled``` to true.Replace with your SMTP Details for the Functioning.
```
"mail_service_enabled": false,
"smtp_host": "smtp.gmail.com",
"smtp_port": 465,
"smtp_user": "example@gmail.com",
"smtp_pass": "---password---",
```

5. If you want to enable Telegram Bots Support, Set your Own Credentials.
```
tg_session - Telegram Session String
api_id - Telegram App API ID, get it from my.telegram.org
api_hash - Telegram App API Hash, get it from my.telegram.org
```
6. Follow this [WIKI](https://github.com/Upstats/Worker/wiki/Deploy-with-Docker) to Deploy with Docker.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request
6. That's it

## License

Distributed under the GNU GPLV3 License. See `LICENSE` for more information.

## About US

UpStats is developed by [ToolsHD](https://gitHub.com/ToolsHD) and [Gowtham](https://github.com/Gowtham2003)
