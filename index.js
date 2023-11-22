import dotenv from 'dotenv';
dotenv.config()
import OpenAI from "openai";
import fs from 'fs';
// import {spit} from './bro-lang/index.js';
import { Lexer } from "./bro-lang/front/lexer.js"
import { Parse } from "./bro-lang/front/parser.js"
import { Eval } from "./bro-lang/back/interpret.js"
import { ENV } from "./bro-lang/back/var.js";
import chalk from 'chalk'
import util from 'util'
// const chalk = require("chalk")
const sleep = ms => new Promise(r => setTimeout(r, ms));
import http from 'http';
import { log, error } from 'console';
const openai = new OpenAI({
	apiKey: process.env.KEY,
});
let stops = false
let dev = true
async function chatgpt(params) {
	let res = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				"role": "user",
				"content": params,
				"name": "Dora"
			},
		],
		temperature: 1,
		max_tokens: 255,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	}).then(res => res.choices[0].message.content)

	return res
}
import { Client, GatewayIntentBits, AttachmentBuilder} from 'discord.js';
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	]
});
let reses = {

}
// async function compile() {
// 	let res = "";
// 	let stack={

// 	}
// 	function interpret(ast) {
// 		for (tree of ast){
// 			if (tree.type === "var") {
// 				stack[tree.value] = tree.string
// 			}
// 			if (tree.type === "func") { 
// 				res += tree.string
// 				res += "\n"
// 			}
// 			if (tree.type === "if") { 
// 				if (Array.isArray(tree.value)) {
// 							for (con of tree.value){
// 							reses[con] = tree.string
// 							}
// 				}
// 				else{
// 					reses[tree.value] = tree.string
// 				}
// 			}
// 		}
// 		return res
// 	}
// 	function parse(tokens) {
// 		let ast = [];
// 		let cur = 0;
// 		if (!Array.isArray(tokens)) {
// 			return ""
// 		}
// 		// log(tokens)
// 		for (token of tokens) {
// 			if (token.type == "KEY" && token.value == "print") {
// 				let tree = {
// 					type: "func",
// 					value: token.value,
// 					string: tokens[cur + 1].type == "STR"? tokens[cur + 1].value : stack[tokens[cur + 1].value],
// 				}
// 				ast.push(tree);
// 			}
// 			else if (token.type == "KEY" && token.value == "if") {
// 				let tree = {
// 					type: "if",
// 					value: tokens[cur + 1].value,
// 					string: tokens[cur + 3] ? tokens[cur + 3].value : "",
// 				}
// 				ast.push(tree);
// 			}
// 			else if (token.type == "KEY" && token.value == "var") {
// 				let tree = {
// 					type: "var",
// 					value: tokens[cur + 1].value,
// 					string: tokens[cur + 3].type == "STR" ? tokens[cur + 3].value : stack[tokens[cur + 3].value],
// 				}
// 				ast.push(tree);
// 			}
// 			cur++;
// 		}
// 		return ast;
// 	}
// 	function lexer(str) {
// 		let tokens = [];
// 		let in_str = false;
// 		let strs = ""
// 		let nums = ""
// 		let keys = ""
// 		let in_if = false;
// 		let in_num = false
// 		let if_array = [];
// 		let cur = 0;
// 		for (word of str) {
// 			if (word == "\"") {
// 				in_str = !in_str;
// 			}
// 			if (!in_str && word == "\n" || word == "\r" || word == "\t") {
// 				word = ""
// 			}
// 			if (!in_str && word in ['1','2','3','4','5','6','7','8','9','0']) {
// 				nums += word 
// 				in_num = true
// 			}else if (nums != "") {
// 				let token = {
// 					type: "NUM",
// 					value: nums,
// 				}
// 				if (!in_if) {
// 					tokens.push(token)
// 				}
// 				nums = ""
// 				in_num = false
// 				continue;
// 			}
// 			if (word.match(/\w*/gi) && in_str && word != "\"") {
// 				strs += word
// 			} else if (strs != "") {
// 				let token = {
// 					type: "STR",
// 					value: strs,
// 				}
// 				if (!in_if) {
// 					tokens.push(token)
// 				}
// 				else{
// 					if_array.push(strs)
// 				}
// 				strs = ""
// 			} else {
// 				if (word == '=' && !in_str && !in_num) {
// 					let token = {
// 						type: "ASSIGN",
// 						value: word,
// 					}
// 					tokens.push(token)
// 				} 
// 				// else if (!in_str && word != "|") {
// 				// 	keys += word
// 				// }
// 				else if (word.match(/\w*/gi) && !in_str && word != "\"" && word != " ") {
// 					keys += word
// 				} else if (keys != "") {
// 					if (keys == "then") {
// 						in_if = false
// 						if ((Array.isArray(if_array) && if_array.length)) {
// 							let token = {
// 								type: "STR_ARR",
// 								value: if_array,
// 							}
// 							tokens.push(token)
// 							if_array =[]
// 						}
// 					}
// 					if (keys == "if") {
// 						in_if = true
// 					}
// 					if (stack[keys]) {
// 						let token = {
// 							type: "VAR_STR",
// 							value: keys,
// 						}
// 						tokens.push(token)
// 					}
// 					else{
// 						let token = {
// 							type: "KEY",
// 							value: keys,
// 						}
// 						tokens.push(token)
// 					}
// 					keys = ""
// 				}
// 			}
// 			cur++
// 		}
// 		if (tokens.length > 0) {
// 			return tokens

// 		}else return ""
// 	}
// 	if (fs.existsSync("hsn.bro") && fs.existsSync("hsn.🗿")) {
// 		let all_con = ""
// 		fs.readFile("hsn.bro", "utf8", (err, data) => {
// 			all_con+= data
// 			// all_con.push(lines)
// 			// for (str of lines) {
// 				// str = str + " "
// 				// console.log(str)
// 				// console.table(lexer(str))
// 				// console.table(parse(lexer(str)))
// 				// interpret(parse(lexer(str))) 
// 				// ? console.table(interpret(parse(lexer(str)))) : 0
// 			// }
// 			// console.log(res);
// 		fs.readFile("hsn.🗿", "utf8", (err, datas) => {
// 				all_con+= datas
// 			let lines = all_con.split(';')
// 			for (str of lines) {
// 					str = str + " "
// 					// console.log(str)
// 					// console.table(lexer(str))
// 					// console.table(parse(lexer(str)))
// 					interpret(parse(lexer(str))) 
// 				// 	// ? console.table(interpret(parse(lexer(str)))) : 0
// 				}
// 				console.log(res);
// 			// for (str of lines) {
// 			// 	str = str + " "
// 			// 	console.log(str)
// 			// 	console.table(lexer(str))
// 			// 	// console.table(parse(lexer(str)))
// 			// 	interpret(parse(lexer(str))) 
// 			// 	// ? console.table(interpret(parse(lexer(str)))) : 0
// 			// }
// 			})
// 		})
// 		// 	data = datas.split(/(?<! );/gi)
// 		// 	data.forEach(el => {
// 		// 		let name = el.match(/[\w |]+?(?=( )?(?!\/){)/gi)
// 		// 		let elm = el.match(/(?<={)(\n|\w| |\t|\d|,|[!-¿])*(?=})/gim)
// 		// 		if (name && elm) {
// 		// 			let names = name.at(0).split("|")
// 		// 			// let json = `"${name.at(0)}" {${elm}}`
// 		// 			//json += {name}
// 		// 			name.forEach((el, i) => {
// 		// 				if (el && el != " " && el != "  " && el != "   ") {
// 		// 					try {
// 		// 						JSON.parse(`{"${el}":[${elm}]}`)
// 		// 					} catch (error) {
// 		// 						console.log(chalk.red("bro theres an error in your code", "\ni think its in: \n\n", chalk.red(el + " section\n"), "\n^^^^^^^^\n" + "check if you missed any coma or semi colons"))
// 		// 						throw new Error('Uh oh!');
// 		// 					}
// 		// 					jss = Object.assign(reses, JSON.parse(`{"${el}":[${elm}]}`))
// 		// 				}
// 		// 			})

// 		// 			// console.log(property, jss[property]);
// 		// 		}




// 		// 	})


// 	}
// }
function print(data) {
	typeof data === 'object' || Array.isArray(data) ? console.log(util.inspect(data, true, 12, true)) : console.log(data)
	// console.log(util.inspect(data,true,12,true))
}
let envs = new ENV()
let res = ""
fs.readFile("other/hsn.bro", async (err, data) => {
    function spit(data) {
		console.log(data.toString());
		console.log("-----------\n");
		// console.time()
		let lex_res = new Lexer(data.toString())
		let lex = lex_res.tokenize()
		if (lex_res.err){print(chalk.redBright("Lexer error:\t") + chalk.red(lex_res.err_text));return 0}
		print(lex);
		console.log("-----------\n");
		let ast_res = new Parse(lex)
		let ast = ast_res.AST()
		if (ast_res.err){print(chalk.redBright("Parser error:\t") + chalk.red(ast_res.err_txt));return 0}
		print(ast);
		console.log("-----------\n");
		res = new Eval(ast, envs)
		print(res.interpret());
		res.eval_function_run({
		  type: 'FUN_CALL',
		  args: [
		    { value: '1', type: 'NUMBER', grp: 'AST' },
		  ],
		  value: 'compile'
		},envs)
		// console.timeEnd()
	  }
	spit(data.toString())
  })
// spit()
async function replay(msg) {
	log(msg.content)
	if(msg.content.startsWith("nega")){
		msg.delete()
	}
	let found = false
	if (msg.content.startsWith("dora") && !msg.author.bot) {

		if (!found) {	
		if (msg.content == "dora") {
			msg.channel.send('YO wassup this is D.o.r.a the explora');
			msg.channel.send('im a npc or a discord bot made by hsn-bro-coder');
			msg.channel.send('you can ask me anything beside this guy');
			msg.channel.send('https://static.wikia.nocookie.net/doratheexplorer/images/f/f1/Swiper_20.jpg/revision/latest?cb=20221123144916');
			msg.channel.send('i aint hate this guy');
			msg.channel.send("# i fear him");
		}
		else if (msg.content.match('masterbate') || msg.content.match('fuck') || msg.content.match('porn') || msg.content.match('cum')) {
			msg.reply('nooo its haram');
		}
		else if (msg.content.match('spam')) {
		if (stops){
			msg.channel.send('spam is disabled for some times');
			return 0
		}
			let text = msg.content.split("spam")[1]
			let i = 0
			let inter = setInterval(() => {
				if (i < 20 && !stops) {
					msg.channel.send(text);
					i++;
				} else clearInterval(inter);
			}, 1000)
		}
		else if (msg.content.match("nice work") || msg.content.match("well done") || msg.content.match("good job")) {
			msg.reply("thanks man");
		}
		// else if (msg.content.match('who are you') ) {
		//   msg.channel.send(`man what the heck im dora an discord bot developed by your bro hasan. I am here beat the shit out of you`)
		// }
		else if (msg.content.match('sing the theme')) {
			msg.channel.send('di');
			msg.channel.send('di');
			msg.channel.send('dick');
			msg.channel.send('di');
			msg.channel.send('dora');
			msg.channel.send('----------');
			msg.channel.send('di');
			msg.channel.send('di');
			msg.channel.send('dick');
			msg.channel.send('di');
			msg.channel.send('dora');
			msg.channel.send('-----------');
			msg.channel.send('dora');
			msg.channel.send('dora');
			msg.channel.send('dora');
			msg.channel.send('di');
			msg.channel.send('explora');
			// msg.author.send('dick');
			// msg.author.send('di');
		}
		// else if (msg.content.match('alive')) {    
		//     msg.reply('nah');
		// }
		else if (msg.content.match(/nig[gae]*/g)) {
			msg.reply(msg.content + " who");
			msg.channel.send((msg.user || "bro") + " your being racist bro");
		}
		else if (msg.content.match("turn on self destruct mode in")) {
			msg.channel.send("as your wish master");
			msg.channel.send("turning on self destruct mode in");
			for (let i=Number(msg.content.split("in")[1]);i > 0;i--){
				msg.channel.send(`${i}`);
				await sleep(1100)
			}
			msg.channel.send("im dead");
			dev = false

				// msg.reply(msg.content + " who");
				// msg.channel.send((msg.user || "bro") + " your being racist bro");
		}
		else if (msg.content.match("stop")) {
			msg.reply("ok");
			stops = true
		}
		else if (msg.content.match("send me some nude") || msg.content.match("send nude") || msg.content.match("send some nude")) {
			// msg.channel.send(msg.channel. || "noh")
			msg.channel.send("https://i.kym-cdn.com/entries/icons/original/000/033/160/cover1.jpg")
			msg.channel.send("what did you just say bro i cant here you")
			msg.channel.send("# say")
			msg.channel.send("# IT")
			msg.channel.send("# Again")
		}
		else if (msg.content.match("send me some meme") || msg.content.match("send meme") || msg.content.match("send some meme")) {

			fetch("https://meme-api.com/gimme/dankmemes")
				// fetch("https://meme-api.com/gimme/2")
				.then((response) => response.json())
				.then((data) => {
					msg.channel.send("# heres some memes bro :skull: \n" + data.url);
					msg.channel.send(data.title);
					//     // updateDetails(, data.title, data.author);
				});
		}
		else if (msg.content.match(/who asked [a-z]*/g)) {
			msg.reply("cum on dm niggi ill tell you who asked")
			msg.author.send(`# nigge your mama didnt ask for you
			   # but here you are `);
		}
		else {
			let isthere = false;
			let dora_msg = msg.content.split("dora ")
			dora_msg.shift()
			console.log("in complie msg:",dora_msg.join(""));
			let rest = res.eval_function_run({
				type: 'FUN_CALL',
				args: [
				  { value: dora_msg.join(""), type: 'STR', grp: 'AST' },
				],
				value: 'compile'
			  },envs)
			  log("rest:",rest)
			  if (!(rest.value == "0" || rest.value == 0)) {
				msg.channel.send(rest.value)
				isthere = true
			  }else{
				let content = await chatgpt(dora_msg.join(""));
			content = content.replace("AI language model", "discord bot")
			content = content.replace("artificial intelligence", "discord bot")
			content = content.replace(/openai|(open ai)/gi, "hsn bro coder")
			content = content.replace("AI", "discord bot")
				// log(msg.content.replace("dora", ''),content)
			if (content.length >= 1090) {
				fs.writeFileSync('./con.txt', content, 'utf8');
				const file = new AttachmentBuilder('./con.txt');
				msg.channel.send({ files: [file] });
			} else msg.channel.send(content)
			}
			// for (const key in reses) {
			// 	if (msg.content.match(key)) {
			// 		found = !found
			// 		isthere = true
			// 		Array.isArray(reses[key]) ?
			// 			reses[key].forEach((el, i) => {
			// 				msg.channel.send(el);
			// 			}) : msg.channel.send(reses[key])
			// 		break;
			// 	}
			// }
			
		}
	}

	}
}
client.on('ready', () => {
	console.log('Logged in!');
});
client.on("interactionCreate", async int => {
	if (int.commandName == "dora_nnn" && dev) {
		let d = new Date()
		let mood = int.options.get("moods").value
		if (d.getMonth() == 10) {

			int.reply({
				"content": int.user.displayName+"'s nnn day "+d.getDate(),
				"tts": false,
				"embeds": [
				  {
					"id": 805384253,
					"description": mood == "perfect" ?  "your good bro nothing wrong" : mood == "good" ? "yo bro stay cool" : "yo bro nedd motivation stay safe", 
					"fields": [
					  {
						"id": 514064932,
						"name": "Mood:",
						"value": `__${mood}__`,
						"inline": true
					  },
					  {
						"id": 856399058,
						"name": "Day:",
						"value": d.getDate(),
						"inline": true
					  },
					  {
						"id": 607984563,
						"name": "Description:",
						"value": int.options.get("description").value,
						"inline": false
					  }
					],
					"title": int.user.displayName + "'s nnn status",
					"color": 327935,
					"timestamp": d
				  }
				],
				"components": [],
				"actions": {},
				"username": "dora"
			  })
		}else{
			int.replay("bro its not november")
		}
	}
	else if (int.commandName == "dora_code" ) {
		function erorr(value) {
			int.reply({
				"content": "try again",
				"embeds": [
					{
					  "id": 805384253,
					  "description": `the error is ${value}` , 
					  "title": int.user.displayName + "'s having a code error",
					  "color": 15548997,
					  "timestamp": new Date()
					}
				  ],
			})
		}
		let code = int.options.get("code").value
		if (!code.includes(";") || !code.match(/[;]|                             $/gim)){
			erorr("no ; found at the end")
			return 0
		}
		code = "\n" + code
		fs.appendFile('hsn.🗿', code, () => {
			int.reply("done")
			compile()
			// file written successfully
		  });
	}

}
)
client.on('messageCreate', async msg => {
	if (msg.content.startsWith("dora") && !msg.author.bot && (msg.content.match("turn off self destruct mode") || msg.content.match("refresh"))) {
		dev = true
		stops = false
		msg.reply("done")
		return 0
	}
	if (dev) {
		replay(msg)
	}else {
		msg.channel.send("dora is currently in dev mode so you cant use it rn");
	}
});
client.login(process.env.TOKEN);
http.createServer(function(req, res) {
	res.write("I'm alive");
	// res.end();
}).listen(8080);