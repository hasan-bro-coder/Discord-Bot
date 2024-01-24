import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import fs from "fs";
// import {spit} from './bro-lang/index.js';
import { Lexer } from "./bro-lang/front/lexer.js";
import { Parse } from "./bro-lang/front/parser.js";
import { Eval } from "./bro-lang/back/interpret.js";
import { ENV } from "./bro-lang/back/var.js";
import chalk from "chalk";
let avatar_url = "https://cdn.discordapp.com/avatars/1148221869137342535/9c2693d9dffed3bc413ddf5f6b760c7f.webp"
// const chalk = require("chalk")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
import http from "http";
import { log } from "console";
const openai = new OpenAI({
  apiKey: process.env['KEY'],
});
let stops = false;
let dev = true
async function chatgpt(params) {
  let res = await openai.chat.completions
	.create({
	  model: "gpt-3.5-turbo",
	  messages: [
		{
		  role: "user",
		  content: params,
		  name: "Dora",
		},
	  ],
	})
  return res.choices[0].message.content;
}
import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
const client = new Client({
  intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
  ],
});

let envs = new ENV(undefined);
let res = "";
let json_data = {};

fs.readFile("other/data.json", "utf8", (err, data) => {
	json_data = JSON.parse(data)
})

function print(data) {
// typeof data === "object" || Array.isArray(data)
// ? console.log(util.inspect(data, true, 12, true))
// : console.log(data);
// console.log(util.inspect(data,true,12,true))
}
fs.readFile("other/hsn.bro", async (err, data) => {
function spit(data) {
	// console.log(data.toString());
	console.log("-----------\n");
	// console.time()
	let lex_res = new Lexer(data.toString());
	let lex = lex_res.tokenize();
	if (lex_res.err) {
	  print(chalk.redBright("Lexer error:\t") + chalk.red(lex_res.err_text));
	  return 0;
	}
	print(lex);
	console.log("-----------\n");
	let ast_res = new Parse(lex);
	let ast = ast_res.AST();
	if (ast_res.err) {
	  print(chalk.redBright("Parser error:\t") + chalk.red(ast_res.err_txt));
	  return 0;
	}
	print(ast);
	console.log("-----------\n");
	res = new Eval(ast, envs);
	print(res.interpret());
	// res.eval_function_run({
	//   type: 'FUN_CALL',
	//   args: [
	// 	{ value: '1', type: 'NUMBER', grp: 'AST' },
	//   ],
	//   value: 'compile'
	// },envs)
	// console.timeEnd()
  }
  spit(data.toString());
});

async function replay(msg, content, author) {
  log(author.displayName+": ",content);
  if (content.includes("nega") || content.includes("nigge") || content.includes("nigger")) {
	msg.delete();
	  msg.channel.send(author.username+" said: "+content.replace("nega", "n-word").replace("nigger" , "n-word").replace("nigge", "n-word"));
  }
  let found = false;
  if (content.startsWith("dora") && !author.bot) {
	if (!found) {
	  if (content == "dora") {
		msg.channel.send("YO wassup this is D.o.r.a the explora");
		msg.channel.send("im a npc or a discord bot made by hsn-bro-coder");
		msg.channel.send("you can ask me anything beside this guy");
		msg.channel.send(
		  "https://static.wikia.nocookie.net/doratheexplorer/images/f/f1/Swiper_20.jpg/revision/latest?cb=20221123144916"
		);
		msg.channel.send("i aint hate this guy");
		msg.channel.send("# i fear him");
	  } else if (
		content.match("masterbate") ||
		content.match("fuck") ||
		content.match("porn") ||
		content.match("cum")
	  ) {
		msg.channel.send("naaaaaah its haram");
	  } else if (content.match("spam")) {
		if (stops) {
		  msg.channel.send("spam is disabled for some times");
		  return 0;
		}
		let text = content.split("spam")[1];
		let i = 0;
		let inter = setInterval(() => {
		  if (i < 20 && !stops) {
			msg.channel.send(text);
			i++;
		  } else clearInterval(inter);
		}, 1000);
	  } else if (
		content.match("nice work") ||
		content.match("well done") ||
		content.match("good job")
	  ) {
		msg.channel.send("thanks man");
	  }else if (
		content.match("ping")
	  ) {
		msg.channel.send("pong bro im alive");
	  }
	  // else if (content.match('who are you') ) {
	  //   msg.channel.send(`man what the heck im dora an discord bot developed by your bro hasan. I am here beat the shit out of you`)
	  // }
	  else if (content.match("sing the theme")) {
		msg.channel.send("dod");
		msg.channel.send("do");
		msg.channel.send("dod");
		msg.channel.send("dod");
		msg.channel.send("do");
		msg.channel.send("dora");
		msg.channel.send("----------");
		msg.channel.send("dod");
		msg.channel.send("do");
		msg.channel.send("dod");
		msg.channel.send("dod");
		msg.channel.send("do");
		msg.channel.send("dora");
		msg.channel.send("-----------");
		msg.channel.send("dora");
		msg.channel.send("dora");
		msg.channel.send("dora");
		msg.channel.send("the");
		msg.channel.send("explora");
		// msg.author.send('dick');
		// msg.author.send('di');
	  }
	  else if (content.match('alive')) {
	      msg.reply('nah');
	  }
	  else if (content.match(/nig[gae]*/g)) {
		msg.channel.send(content + " who");
		msg.channel.send((msg.user || "bro") + " your being racist bro");
	  } else if(content.match("die")){
		msg.channel.send("as your wish master");
		msg.channel.send("im dead");
		process.exit(0)
	  }else if (
		content.match("turn on self destruct mode in") ||
		content.match("die") ||
		content.match("self destruct in")
	  ) {
		msg.channel.send("as your wish master");
		msg.channel.send("turning on self destruct mode in");
		dev = false;
		for (let i = Number(content.split("in")[1] || 10); i > 0; i--) {
		  msg.channel.send(`${i}`);
		  await sleep(1100);
		}
		msg.channel.send("im dead");
		// msg.reply(content + " who");
		// msg.channel.send((msg.user || "bro") + " your being racist bro");
	  } else if (content.match("stop")) {
		msg.channel.send("ok");
		stops = true;
	  } else if (
		content.match("send me some nude") ||
		content.match("send nude") ||
		content.match("send some nude")
	  ) {
		// msg.channel.send(msg.channel. || "noh")
		msg.channel.send(
		  "https://i.kym-cdn.com/entries/icons/original/000/033/160/cover1.jpg"
		);
		msg.channel.send("what did you just say bro i cant here you");
		msg.channel.send("# say");
		msg.channel.send("# IT");
		msg.channel.send("# Again");
	  } else if (
		content.match("send me some meme") ||
		content.match("send meme") ||
		content.match("send some meme")
		) {
		fetch("https://meme-api.com/gimme/dankmemes")
		.then((response) => response.json())
		.then((data) => {
		  msg.channel.send("# heres some memes bro :skull: \n" + data.url);
		  msg.channel.send(data.title);
		});
	  } else if (content.match(/who asked/gi)) {
		msg.channel.send("cum on dm niggi ill tell you who asked");
		author.send(`# nigge your mama didnt ask for you
		# but here you are `);
	  } else {
		try{
		let dora_msg = content.replace("dora ","");
		envs.msg = {
			send: (data)=>{
				if(!dev) return 0
				msg.channel.send(data)
			}
		  } 
		 
		let rest = res.eval_function_run(
		  {
			type: "FUN_CALL",
			args: [{ value: dora_msg, type: "STR", grp: "AST" }],
			caller: { type: 'IDENT', value: 'run', grp: 'AST' },
			value: "compile",
		  },envs
		);
		if (
		  rest &&
		  !(rest?.value == "0" || rest?.value == 0 || rest?.type == "NULL")
		) {
		  msg.channel.send(rest?.value);
		  isthere = true;
		} else{
      if (Object.keys(json_data.code).includes(dora_msg)) {
		envs.add_vars("msg", {
			content: { type: "STR", value: dora_msg },
		  });
        let rest = res.eval_function_run(
          {
          type: "FUN_CALL",
          args: [{ value: json_data.code[dora_msg], type: "STR", grp: "AST" }],
          caller: { type: 'IDENT', value: 'run', grp: 'AST' },
          value: "run",
          },envs
        );
      }
      else {
	// try{
		  let content = await chatgpt(dora_msg);
		  content = content.replace("AI language model", "discord bot");
		  content = content.replace("artificial intelligence", "discord bot");
		  content = content.replace(/openai|(open ai)/gi, "hsn bro coder");
		  content = content.replace("AI", "discord bot");
		  if (content.length >= 1090) {
			fs.writeFileSync("./other/con.txt", content, "utf8");
			const file = new AttachmentBuilder("./other/con.txt");
			msg.channel.send({ files: [file] });
		  } else msg.channel.send(content);
	// }catch(err){
	// 	  msg.channel.send("sorry cant answer you right now")
	// }
		}
  }
	  }catch(err){
		  msg.channel.send({
			content: "error ocurd",
			embeds: [
			  {
				id: 605268405,
				description: JSON.stringify(err) + "try again later",
				fields: [],
				author: {
				  name: author?.displayName,
				  url: "https://github.com/hasan-bro-coder/bot",
				  icon_url: author?.avatarURL(),
				},
				color: 15548997,
				url: "https://github.com/hasan-bro-coder/bot",
				footer: {
				  text: "made by hsn-bro-coder",
				  icon_url:
					"https://cdn.discordapp.com/avatars/1110868817229389824/3da687734081a38e32c7f5b8acb1399c.webp?size=80",
				},
				timestamp: "2023-12-01T18:00:00.000Z",
			  },
			],
		  })
		}
	  }
	}
  }
}
client.on("ready", () => {
  console.log("Logged in!");
});
client.on("interactionCreate", async (int) => {
	if (!dev) {
	int.channel.reply("dora is in dev mode")
	return 0
}
  if (int.commandName == "dora_bro") {
	function print(data) {
	  int.channel.send({
		content: "ERROR found while compiling",
		tts: false,
		embeds: [
		  {
			id: 605268405,
			description: `### the error is \n \`\`\`${data}\`\`\``,
			fields: [],
			author: {
			  name: int.user.displayName,
			  url: "https://github.com/hasan-bro-coder/bot",
			  icon_url: int.user.avatarURL(),
			},
			title: "ERROR CODE 1:",
			color: 16711680,
			url: "https://github.com/hasan-bro-coder/bot",
			footer: {
			  text: "made by hsn-bro-coder",
			  icon_url:
				"https://cdn.discordapp.com/avatars/1110868817229389824/3da687734081a38e32c7f5b8acb1399c.webp?size=80",
			},
			timestamp: "2023-12-01T18:00:00.000Z",
		  },
		],
		components: [],
		actions: {},
		username: "dora",
		avatar_url
	  });
	}
	let code = int.options.get("code")?.value.replace("\\n", "\n") || "";
	let code_file = int.options.get("code_file");
	function spit(data) {
	  // console.log(data.toString());e,URL.createObjectURL(cod_file)
	  let msg = {
		send: (data)=>{
			if(!dev) return 0
			int.channel.send(data)
		}
	  } 
	  let envs = new ENV(undefined,msg);
	  // console.log("-----------\n");
	  // console.time()
	  let lex_res = new Lexer(data.toString());
	  let lex = lex_res.tokenize();
	  if (lex_res.err) {
		print("Lexer error: " + lex_res.err_text);
		return 0;
	  }
	  // print(lex);
	  // console.log("-----------\n");
	  let ast_res = new Parse(lex);
	  let ast = ast_res.AST();
	  if (ast_res.err) {
		print("Parser error: " + ast_res.err_txt);
		return 0;
	  }
	  // print(ast);
	  // console.log("-----------\n");
	  res = new Eval(ast, envs);
	  log(res.interpret());
	  // console.timeEnd()
	}
	if (!code_file) {
	  int.reply({
		content: "",
		tts: false,
		embeds: [
		  {
			id: 605268405,
			description: `### the code is \n \`\`\`${code}\`\`\``,
			fields: [],
			author: {
			  name: int.user.displayName,
			  url: "https://github.com/hasan-bro-coder/bot",
			  icon_url: int.user.avatarURL(),
			},
			title: "your response is being generated by dora",
			color: 3900150,
			url: "https://github.com/hasan-bro-coder/bot",
			footer: {
			  text: "made by hsn-bro-coder",
			  icon_url:
				"https://cdn.discordapp.com/avatars/1110868817229389824/3da687734081a38e32c7f5b8acb1399c.webp?size=80",
			},
			timestamp: "2023-12-01T18:00:00.000Z",
		  },
		],
		components: [],
		actions: {},
		username: "dora",
		avatar_url
	  });
	  spit(code.toString());
	  console.log("done");
	} else {
	  (async () => {
		let url = code_file.attachment.url;
		try {
		  int.reply({
			content: "",
			tts: false,
			embeds: [
			  {
				id: 605268405,
				description: `### filename:  \n \`\`\`${code_file.attachment.name}\`\`\``,
				fields: [],
				author: {
				  name: int.user.displayName,
				  url: "https://github.com/hasan-bro-coder/bot",
				  icon_url: int.user.avatarURL(),
				},
				title: "your .bro file is compiling by dora",
				color: 3900150,
				url: "https://github.com/hasan-bro-coder/bot",
				footer: {
				  text: "made by hsn-bro-coder",
				  icon_url:
					"https://cdn.discordapp.com/avatars/1110868817229389824/3da687734081a38e32c7f5b8acb1399c.webp?size=80",
				},
				timestamp: "2023-12-01T18:00:00.000Z",
			  },
			],
			components: [],
			actions: {},
			username: "dora",
			avatar_url
		  });
		  const response = await fetch(url);
		  if (!code_file.attachment.name.endsWith(".bro")) {
			print("bro send a .bro file not " + code_file.attachment.name);
			return 0;
		  }
		  if (!response.ok)
			return int.channel.send(
			  "There was an error with fetching the file:",
			  response.statusText
			);
		  const code = await response.text();
		  if (code) {
			// int.channel.send(`\`\`\`${text}\`\`\``);
			spit(code.toString());
			// int. "done");
		  }
		} catch (error) {
		  console.log(error);
		}
	  })();
	}
  }
  if (int.commandName == "dora") {
	let str = int.options.get("prompt").value;
	console.log(str);
	int.reply({
	  content: "",
	  tts: false,
	  embeds: [
		{
		  id: 605268405,
		  description:
			"it can take **1-60** seconds\n\nif the response is taking too long then just **google it**\n\n",
		  fields: [],
		  author: {
			name: int.user.displayName,
			url: "https://github.com/hasan-bro-coder/bot",
			icon_url: int.user.avatarURL(),
		  },
		  title: "your response is being generated by dora",
		  color: 3900150,
		  url: "https://github.com/hasan-bro-coder/bot",
		  footer: {
			text: "made by hsn-bro-coder",
			icon_url:
			  "https://cdn.discordapp.com/avatars/1110868817229389824/3da687734081a38e32c7f5b8acb1399c.webp?size=80",
		  },
		  timestamp: "2023-12-01T18:00:00.000Z",
		},
	  ],
	  components: [],
	  actions: {},
	  username: "dora",
	  avatar_url
	});
	replay(int, "dora " + str, int.user);
  }
  if (int.commandName == "dora_nnn" && dev) {
	let d = new Date();
	let mood = int.options.get("moods").value;
	  int.reply({
		content: int.user.displayName + "'s nnn day " + d.getDate(),
		tts: false,
		embeds: [
		  {
			id: 805384253,
			description:
			  mood == "perfect"
				? "your good bro nothing wrong"
				: mood == "good"
				? "yo bro stay cool"
				: "yo bro nedd motivation stay safe",
			fields: [
			  {
				id: 514064932,
				name: "Mood:",
				value: `__${mood}__`,
				inline: true,
			  },
			  {
				id: 856399058,
				name: "Day:",
				value: d.getDate(),
				inline: true,
			  },
			  {
				id: 607984563,
				name: "Description:",
				value: int.options.get("description").value,
				inline: false,
			  },
			],
			title: int.user.displayName + "'s nnn status",
			color: 327935,
			timestamp: d,
		  },
		],
		components: [],
		actions: {},
		username: "dora",
	  });
	
  } 
  if (int.commandName == "dora_code") {
	// function erorr(value) {
	//   int.reply({
	// 	content: "try again",
	// 	embeds: [
	// 	  {
	// 		id: 805384253,
	// 		description: `the error is ${value}`,
	// 		title: int.user.displayName + "'s having a code error",
	// 		color: 15548997,
	// 		timestamp: new Date(),
	// 	  },
	// 	],
	//   });
	// }
	let key = int.options.get("if").value;
	let value = int.options.get("then").value;
  int.reply("done");
  console.log("running")
  json_data.code[key] = value
  fs.writeFile('./other/data.json', JSON.stringify(json_data), err => {
    console.log("written")
	// if (!code.includes(";") || !code.match(/[;]|                             $/gim)){
	// 	erorr("no ; found at the end")
	// 	return 0
	// }
    // file written successfully
  });
	// fs.appendFile("./other/data.bro", code, () => {
	  // compile();
	  // file written successfully
	// });
  }
  if (int.commandName == "dora_meme") {
	fetch("https://meme-api.com/gimme/dankmemes")
		.then((response) => response.json())
		.then((data) => {
			int.reply({
				content: "/dora_meme",
				tts: true,
				embeds: [
				  {
					id: 605268405,
					description:
					  "enjoy your meme",
					fields: [],
					author: {
					  name: int.user.displayName,
					  url: "https://github.com/hasan-bro-coder/Discord-Bot",
					  icon_url: int.user.avatarURL(),
					},
					image: {
						url: data.url,
					},
					title: data.title,
					color: 3900150,
					url: "https://github.com/hasan-bro-coder/Discord-Bot",
					footer: {
					  text: "made by hsn-bro-coder",
					  icon_url:
						"https://cdn.discordapp.com/avatars/1110868817229389824/3da687734081a38e32c7f5b8acb1399c.webp?size=80",
					},
					// timestamp: "2023-12-01T18:00:00.000Z",
				  },
				],
				components: [],
				actions: {},
				username: "dora",
				avatar_url
			}); 
	}); 
	// fs.appendFile("./other/data.bro", code, () => {
	  // compile();
	  // file written successfully
	// });
  }
  if (int.commandName == "dora_wish"){
	let date = int.options.get("date").value
	let dates = date.split("/")
	let day = dates[0] +"/"+ dates[1]
	let channel = int.options.get("channel");
	let name = int.options.get("user");
	if (!(name && date && channel && dates.length == 3)) {
		int.reply({
			content: "error ocurd",
			embeds: [
			  {
				id: 605268405,
				description: err.message + "try again later",
				fields: [],
				author: {
				  name: author?.displayName,
				  url: "https://github.com/hasan-bro-coder/bot",
				  icon_url: author?.avatarURL(),
				},
				color: 15548997,
				url: "https://github.com/hasan-bro-coder/bot",
				footer: {
				  text: "made by hsn-bro-coder",
				  icon_url:
					"https://cdn.discordapp.com/avatars/1110868817229389824/3da687734081a38e32c7f5b8acb1399c.webp?size=80",
				},
				timestamp: "2023-12-01T18:00:00.000Z",
			  },
			],
		  })
		  return 0
	}
	json_data.date[day] = {channel: channel.channel.id,name: {id:name.value,name: name.user.displayName},date: dates[2]}
	console.log(JSON.stringify(json_data))
	try{
		fs.writeFile('./other/data.json', JSON.stringify(json_data), err => {
			
		});
	}catch(err){}
	if(int.options.get("wish_rn")?.value){
		let data={channel: channel.channel.id,name: {id:name.value,name: name.user.displayName},date: dates[2]}
		let names = data.name.id
		let date = new Date()
		int.channel.send({
			"content": `Happy birth day to <@${names}> 🥳\nHappy birthday to <@${names}> 🎉\nHappy birthday to dear <@${names}>🎊\nhope you have a good time\nhappy birthday from everyone in the server\ncongrats you are now ${date.getFullYear() - Number(data.date)}\n\t\t\t`,
			"tts": false,
			"embeds": [
			  {
				"id": 386956980,
				"description": `birth date: ${date.getDate() + "/" + (date.getMonth()+1)+"/"+data.date}\nage: ${date.getFullYear() - Number(data.date)}\nname: ${data.name.name}`,
				"fields": [],
				"author": {
				  "name": "Dora"
				},
				"title": "happy birthday to you",
				"thumbnail": {
				  "url": "https://media1.tenor.com/m/y0zptlFKiYIAAAAC/yay-kitty.gif"
				},
				"color": 1023
			  },
			//   {
			// 	"id": 475607252,
			// 	"description": `192.${String(Math.round(Math.random()*9))+String(Math.round(Math.random()*9))+String(Math.round(Math.random())*9)}.${String(Math.round(Math.random()*9))+String(Math.round(Math.random()*9))+String((Math.round(Math.random())*9 < 5 ?Math.round(Math.random())*9 : ""))}`,
			// 	"fields": [],
			// 	"author": {
			// 	  "name": "HSN-BRO-CODER",
			// 	  "icon_url": "https://cdn.discordapp.com/avatars/1110868817229389824/86ce0f880f1cee951af0b39784d91cde.webp"
			// 	},
			// 	"title": "your Birth Day gift:",
			// 	"color": 16711680,
			// 	"footer": {
			// 	  "text": "enjoy the rest of your day"
			// 	}
			//   }
			],
			"components": [],
			"actions": {},
			"username": data.name.name
		  })
	}
	int.reply("ok")
  }
});
client.on("messageCreate", async (msg) => {
  if (
	msg.content.startsWith("dora") &&
	!msg.author.bot &&
	(msg.content.match("turn off self destruct mode") ||
	  msg.content.match("refresh"))
  ) {
	if (msg.author?.displayName) {
		dev = true
		stops = false
	}else{

		msg.reply(
			  "nuh/uh my man aint doing it bro you aint my master and i aint your slave " +
				msg.author?.displayName
			);
		}
	return 0;
  }
  if (dev) {
	replay(msg, msg.content, msg.author);
  } else if (msg.content.startsWith("dora") && !msg.author.bot) {
	msg.channel.send(
	  // "fuck you nigge not your slave" ||
		"dora is currently in dev mode so you cant use it rn"
	);
  }
});
client.login(process.env['TOKEN']);
const start = new Date();
var left = 24 - start.getHours();
// if (millisTill10 < 0){
	// millisTill10 += 86_400_000; // it's after 10am, try 10am tomorrow.
	// console.log("It's over 10am");
// }
let hour = process.env['HOUR'];
function timeWatcher() {
	let date = new Date()
	if (date.getHours() == hour){
		// console.log(new Date().toLocaleDateString(),Object.keys(json_data.date),Object.keys(json_data.date).includes(new Date().toLocaleDateString()));
		if (Object.keys(json_data.date).includes(date.getDate() + "/" + (date.getMonth()+1))) {
			let data = json_data.date[date.getDate() + "/" + (date.getMonth()+1)]
			let channel = data.channel
			let channelt = client.channels.cache.find(channels => channels.id == channel)
			let name = data.name.id
			channelt?.send({
				"content": `Happy birth day to <@${name}> 🥳\nHappy birthday to <@${name}> 🎉\nHappy birthday to dear <@${name}>🎊\nhope you have a good time homie\nhappy birthday from everyone in the server\ncongrats you are now ${date.getFullYear() - Number(data.date)}\n\t\t\t`,
				"tts": false,
				"embeds": [
				  {
					"id": 386956980,
					"description": `birth date: ${date.getDate() + "/" + (date.getMonth()+1)+"/"+data.date}\nage: ${date.getFullYear() - Number(data.date)}\nname: ${data.name.name}`,
					"fields": [],
					"author": {
					  "name": "Dora"
					},
					"title": "happy birthday to you",
					"thumbnail": {
					  "url": "https://media1.tenor.com/m/y0zptlFKiYIAAAAC/yay-kitty.gif"
					},
					"color": 1023
				  },
				//   {
				// 	"id": 475607252,
				// 	"description": `192.${String(Math.round(Math.random()*9))+String(Math.round(Math.random()*9))+String(Math.round(Math.random())*9)}.${String(Math.round(Math.random()*9))+String(Math.round(Math.random()*9))+String((Math.round(Math.random())*9 < 5 ?Math.round(Math.random())*9 : ""))}`,
				// 	"fields": [],
				// 	"author": {
				// 	  "name": "HSN-BRO-CODER",
				// 	  "icon_url": "https://cdn.discordapp.com/avatars/1110868817229389824/86ce0f880f1cee951af0b39784d91cde.webp"
				// 	},
				// 	"title": "your Birth Day gift:",
				// 	"color": 16711680,
				// 	"footer": {
				// 	  "text": "enjoy the rest of your day"
				// 	}
				//   }
				],
				"components": [],
				"actions": {},
				"username": data.name.name
			  })
		}
	}
 else{
	console.log("It's not 10am!",start.getHours(),new Date().toLocaleDateString())
	setTimeout(timeWatcher,60 * 60 * 1000);
 }
}
// timeWatcher();
setTimeout(timeWatcher, 5000);
http
  .createServer(function (req, res) {
	res.write("I'm alive");
	res.end();
  })
  .listen(8080);

