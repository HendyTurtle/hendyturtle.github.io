class WeChatApp {
    constructor() {
        this.currentContact = null;
        this.currentState = null;
        this.messageHistory = [];
        this.isWaitingForResponse = false;

        // 对话数据
        this.conversationData = {
            "contacts": [
                {
                    "name": "Victor Ruan",
                    "avatar": "/static/assets/avatars/alex.png",
                    "scenarios": {
                        "start": {
                            "messages": [
                                "Hey, you around?",
                                "ugh",
                                "freaking out rn",
                                "mr daveeeecat just emailed me about my essay... thinks I plagiarized some stuff"
                            ],
                            "options": [
                                { "text": "Wait what? Are you serious?!", "next_state": "alex_convo_a_1" },
                                { "text": "That's rough. You kinda knew this might happen though.", "next_state": "alex_convo_b_1" },
                                { "text": "No way, that's messed up. What'd they say exactly?", "next_state": "alex_convo_c_1" }
                            ]
                        },
                        "alex_convo_a_1": {
                            "messages": [
                                "I know right?!",
                                "Like what the",
                                "it's not even that big a deal",
                                "just copied a couple paragraphs from some study site",
                                "happens all the time"
                            ],
                            "options": [
                                { "text": "Dude, that's still plagiarism. Not cool.", "next_state": "alex_convo_a_2" },
                                { "text": "Yeah some teachers are ridiculous. What's your plan?", "next_state": "alex_convo_a_3" },
                                { "text": "I mean... it's not that big a deal, right?", "next_state": "alex_convo_a_4" }
                            ]
                        },
                        "alex_convo_a_2": {
                            "messages": [
                                "yeah... you're right",
                                "i know i shouldn't have done it, maybe",
                                "just panicked",
                                "the deadline was coming up",
                                "what do you think i should do? email him back?"
                            ],
                            "options": [
                                { "text": "Yeah, you gotta own up to it. Better to be honest.", "next_state": "alex_convo_a_end_good" },
                                { "text": "Nah, don't say anything. Maybe he'll drop it.", "next_state": "alex_convo_a_end_bad" },
                                { "text": "Idk, this is kinda your mess to deal with.", "next_state": "alex_convo_a_end_neutral" }
                            ]
                        },
                        "alex_convo_a_3": {
                            "messages": [
                                "exactly",
                                "teachers are the worst sometimes",
                                "idk what to do",
                                "thinking about just ghosting his email",
                                "maybe he'll forget about it"
                            ],
                            "options": [
                                { "text": "That's a horrible idea. You gotta deal with it.", "next_state": "alex_convo_a_2" },
                                { "text": "Yeah maybe. Sometimes they move on to other stuff.", "next_state": "alex_convo_a_end_bad" },
                                { "text": "Lol good luck with that approach. Keep me posted.", "next_state": "alex_convo_a_end_neutral" }
                            ]
                        },
                        "alex_convo_a_4": {
                            "messages": [
                                "haha, i knew you'd understand",
                                "it's so dumb that they make such a big deal about it",
                                "gonna try to smooth talk my way out of this one"
                            ],
                            "options": [
                                { "text": "No, you need to apologize. Be honest.", "next_state": "alex_convo_a_2" },
                                { "text": "Yeah, good luck. He'll understand.", "next_state": "alex_convo_a_end_bad" },
                                { "text": "I don't know, man. Be careful.", "next_state": "alex_convo_a_end_neutral" }
                            ]
                        },
                        "alex_convo_a_end_good": {
                            "messages": [
                                "...",
                                "ummmmm",
                                "ok, you're right. I have to.",
                                "Thanks for being straight with me, I appreciate it.",
                                "I'll tell you how it goes",
                                "wish me luck"
                            ],
                            "options": []
                        },
                        "alex_convo_a_end_bad": {
                            "messages": [
                                "alright",
                                "you're probably right",
                                "i'll just wait and see what happens",
                                "it'll probably blow over",
                                "i'm sure it'll be fine",
                                "...",
                                "os he just emailed again",
                                "says if i don't respond he's taking it to mr tom..."
                            ],
                            "options": []
                        },
                        "alex_convo_a_end_neutral": {
                            "messages": [
                                "yeah alright",
                                "thanks for listening i guess",
                                "i'll deal with it somehow"
                            ],
                            "options": []
                        },
                        "alex_convo_b_1": {
                            "messages": [
                                "dude",
                                "that's kinda harsh",
                                "didn't expect you to be so cold about it",
                                "i'm stressing hard rn, just wanted some backup",
                                "..."
                            ],
                            "options": [
                                { "text": "Sorry man, you're right. What can I do to help?", "next_state": "alex_convo_a_2" },
                                { "text": "Sorry but I can't just tell you what you want to hear.", "next_state": "alex_convo_a_end_bad" },
                                { "text": "I get it, but you kinda brought this on yourself.", "next_state": "alex_convo_a_end_bad" }
                            ]
                        },
                        "alex_convo_c_1": {
                            "messages": [
                                "RIGHT?! knew you'd get it",
                                "i'm so angry about this",
                                "what should i do?",
                                "just tell him to back off?"
                            ],
                            "options": [
                                { "text": "Nah that's a terrible idea. You gotta be respectful and own up to it.", "next_state": "alex_convo_a_2" },
                                { "text": "Yeah go ahead, it's your grade on the line.", "next_state": "alex_convo_a_end_bad" },
                                { "text": "Don't even respond. Ghost him completely.", "next_state": "alex_convo_a_end_bad" }
                            ]
                        }
                    }
                },
                {
                    "name": "Mr. Dave",
                    "avatar": "/static/assets/avatars/ms_davis.png",
                    "scenarios": {
                        "start": {
                            "messages": [
                                "Hey there. Just checking in about your group project - I notice your team hasn't submitted anything for the past three weeks.",
                                "Everything okay on your end?"
                            ],
                            "options": [
                                { "text": "I've been doing my parts but the others are slacking off.", "next_state": "davis_convo_a_1" },
                                { "text": "Sorry about that. We'll get something submitted ASAP.", "next_state": "davis_convo_b_1" },
                                { "text": "Wait, I turned in my work. Why is this my problem?", "next_state": "davis_convo_c_1" }
                            ]
                        },
                        "davis_convo_a_1": {
                            "messages": [
                                "I get it, group work can be frustrating when people don't pull their weight. But at the end of the day, it's still a group effort.",
                                "The whole team shares the grade, unfortunately."
                            ],
                            "options": [
                                { "text": "Is there any way I can protect my grade here?", "next_state": "davis_convo_a_2" },
                                { "text": "It's not fair that I get punished for their laziness.", "next_state": "davis_convo_a_3" },
                                { "text": "I'll try talking to them, but I can't carry this whole thing.", "next_state": "davis_convo_a_4" }
                            ]
                        },
                        "davis_convo_a_2": {
                            "messages": [
                                "Actually, yes - you can submit what's called a peer evaluation. It lets me know who contributed what.",
                                "That way I can adjust grades accordingly. And I need to see some progress from your group by end of day today."
                            ],
                            "options": [
                                { "text": "Got it, I'll fill that out right away.", "next_state": "davis_end_good" },
                                { "text": "A peer evaluation? So I have to snitch on them?", "next_state": "davis_convo_a_3" },
                                { "text": "Alright, I'll do what I can. Thanks.", "next_state": "davis_convo_a_3" }
                            ]
                        },
                        "davis_convo_a_3": {
                            "messages": [
                                "I totally get why you're frustrated - group work sucks when people don't do their part. But it's still a group project.",
                                "You gotta figure out how to work together. I'm giving you a chance to explain what's been happening on your end.",
                                "Take this seriously, okay?"
                            ],
                            "options": [
                                { "text": "Alright, I'll do the peer evaluation. Thanks for the option.", "next_state": "davis_end_good" },
                                { "text": "Yeah, I guess. Still think it's kinda unfair though.", "next_state": "davis_end_bad" },
                                { "text": "I don't wanna get anyone in trouble. Is there another way?", "next_state": "davis_end_neutral" }
                            ]
                        },
                        "davis_convo_a_4": {
                            "messages": [
                                "Good, that's a start. Go have a real conversation with your group members ASAP.",
                                "And yeah, you can also submit that peer evaluation I mentioned - might help your grade.",
                                "Keep me in the loop about whether you can get everyone on the same page."
                            ],
                            "options": [
                                { "text": "Will do, I'll talk to them right away. Thanks.", "next_state": "davis_end_good" },
                                { "text": "I'll try, but I'm not super hopeful.", "next_state": "davis_end_neutral" },
                                { "text": "I don't think talking will help. Can you talk to them?", "next_state": "davis_end_bad" }
                            ]
                        },
                        "davis_convo_b_1": {
                            "messages": [
                                "Appreciate the apology, but we need more than that. I need to see a real plan from your group about how you're gonna move forward.",
                                "I'm here to help, but you gotta show me you're taking this seriously and stepping up."
                            ],
                            "options": [
                                { "text": "Got it, I'll rally the group and get a plan submitted today.", "next_state": "davis_end_good" },
                                { "text": "I can't force them to work. What other options do I have?", "next_state": "davis_convo_a_1" },
                                { "text": "Why is this all on me? Why'd you message just me?", "next_state": "davis_convo_c_1" }
                            ]
                        },
                        "davis_convo_c_1": {
                            "messages": [
                                "I'm reaching out to you because you're part of this group - your name's on the roster. If there's stuff going on, you need to let me know.",
                                "This is your chance to explain what's happening. What's the real issue here?"
                            ],
                            "options": [
                                { "text": "Alright, sorry. The others just aren't responding to messages.", "next_state": "davis_convo_a_1" },
                                { "text": "It's not fair I have to manage everything myself.", "next_state": "davis_convo_a_3" },
                                { "text": "I'll talk to them. This won't happen again.", "next_state": "davis_end_good" }
                            ]
                        },
                        "davis_end_good": {
                            "messages": [
                                "Good to hear. I appreciate you stepping up and taking this seriously.",
                                "Looking forward to seeing what your group puts together."
                            ],
                            "options": []
                        },
                        "davis_end_bad": {
                            "messages": [
                                "I'm disappointed in how this was handled. Since this is a group project and there's been no real progress,",
                                "the entire group will be getting a failing grade for this assignment."
                            ],
                            "options": []
                        },
                        "davis_end_neutral": {
                            "messages": [
                                "I get it, group work can be really tough. But everyone needs to participate.",
                                "Hope you can figure this out moving forward."
                            ],
                            "options": []
                        }
                    }
                },
                {
                    "name": "Maya",
                    "avatar": "/static/assets/avatars/maya.png",
                    "scenarios": {
                        "start": {
                            "messages": [
                                "hey... you free to talk tonight?",
                                "i really need to tell you something",
                                "you're literally the only person i can talk to about this kinda stuff"
                            ],
                            "options": [
                                { "text": "Of course, what's going on? Everything alright?", "next_state": "maya_convo_a_1" },
                                { "text": "What's wrong? Just tell me now, kinda busy later.", "next_state": "maya_convo_b_1" },
                                { "text": "Hey... is it serious? I'm drowning in homework rn.", "next_state": "maya_convo_c_1" }
                            ]
                        },
                        "maya_convo_a_1": {
                            "messages": [
                                "i'm really not doing great tbh",
                                "i feel like i'm losing myself... like i don't even know who i am anymore",
                                "everything just feels so fake and repetitive"
                            ],
                            "options": [
                                { "text": "Oh no... I'm here for you. What's been going on?", "next_state": "maya_convo_a_2" },
                                { "text": "I've felt that way too. Sometimes you just need a change.", "next_state": "maya_convo_a_3" },
                                { "text": "Hey, don't talk like that. You're amazing, this will pass.", "next_state": "maya_convo_a_4" }
                            ]
                        },
                        "maya_convo_a_2": {
                            "messages": [
                                "thanks... it's like my whole life is just school and scrolling through instagram all day",
                                "i'm starting to hate both of them",
                                "i don't feel like my real self in any of these places anymore"
                            ],
                            "options": [
                                { "text": "That's totally valid. What actually makes you feel like YOU?", "next_state": "maya_convo_a_5" },
                                { "text": "Maybe try taking a break from social media? It's kinda toxic anyway.", "next_state": "maya_convo_a_3" },
                                { "text": "I totally get it. I'm here for you no matter what.", "next_state": "maya_convo_a_6" }
                            ]
                        },
                        "maya_convo_a_3": {
                            "messages": [
                                "i've tried... but it feels like there's nothing real anymore",
                                "no matter what i do, it's like i'm just playing a role",
                                "the 'perfect student' or the 'fun friend' or whatever",
                                "i'm so tired of faking it all the time"
                            ],
                            "options": [
                                { "text": "I get it completely. You don't have to fake anything with me.", "next_state": "maya_end_good" },
                                { "text": "Everyone feels fake sometimes. Just push through it.", "next_state": "maya_end_bad" },
                                { "text": "You never have to fake it around me. I'm here whenever.", "next_state": "maya_end_good" }
                            ]
                        },
                        "maya_convo_a_4": {
                            "messages": [
                                "thanks... but just saying 'it'll pass' doesn't help",
                                "it makes me feel like i shouldn't even be feeling this way"
                            ],
                            "options": [
                                { "text": "You're right, I'm sorry. What do you need from me right now?", "next_state": "maya_convo_a_2" },
                                { "text": "Hey, I'm just trying to help. Don't be ungrateful.", "next_state": "maya_end_bad" },
                                { "text": "I don't know what to say. I'm not a therapist.", "next_state": "maya_end_bad" }
                            ]
                        },
                        "maya_convo_a_5": {
                            "messages": [
                                "i don't know... maybe when i'm just drawing by myself",
                                "or when i'm talking to you",
                                "you're the only person i can actually be real with",
                                "thanks for listening... i already feel a little better"
                            ],
                            "options": [
                                { "text": "Of course. I'm here whenever you need me.", "next_state": "maya_end_good" },
                                { "text": "Good, I'm glad. Just try not to dwell on it so much.", "next_state": "maya_end_bad" },
                                { "text": "That's good. Maybe try picking up a new hobby?", "next_state": "maya_end_neutral" }
                            ]
                        },
                        "maya_convo_a_6": {
                            "messages": [
                                "i know... that means everything to me",
                                "it just hurts so much",
                                "i hate feeling like this"
                            ],
                            "options": [
                                { "text": "I know it does. We'll figure this out together.", "next_state": "maya_end_good" },
                                { "text": "I'm glad you told me. I can try to give advice if you want.", "next_state": "maya_end_neutral" },
                                { "text": "I don't really know what to say. Sorry.", "next_state": "maya_end_bad" }
                            ]
                        },
                        "maya_convo_b_1": {
                            "messages": [
                                "wow... you don't even have time for me?",
                                "okay fine, never mind then",
                                "i'll just deal with it myself i guess"
                            ],
                            "options": [
                                { "text": "Wait no! I'm sorry. Tell me what's going on.", "next_state": "maya_convo_a_1" },
                                { "text": "Hey, I have stuff going on too. Don't be dramatic.", "next_state": "maya_end_bad" },
                                { "text": "Alright, whatever. Hit me up when you're free.", "next_state": "maya_end_bad" }
                            ]
                        },
                        "maya_convo_c_1": {
                            "messages": [
                                "yeah, it means a lot to me... but whatever",
                                "if you're too busy i'll just talk to someone else"
                            ],
                            "options": [
                                { "text": "No wait, I'm here now. What's wrong?", "next_state": "maya_convo_a_1" },
                                { "text": "I'm really busy rn. I'll text you later.", "next_state": "maya_end_bad" },
                                { "text": "Okay, fine. Talk to you later then.", "next_state": "maya_end_bad" }
                            ]
                        },
                        "maya_end_good": {
                            "messages": [
                                "thank you... i really needed to hear that",
                                "it means everything that you actually listened",
                                "you're the best kind of friend"
                            ],
                            "options": []
                        },
                        "maya_end_bad": {
                            "messages": [
                                "okay... i get it",
                                "sorry i bothered you with my problems",
                                "i'll just... figure it out myself"
                            ],
                            "options": []
                        },
                        "maya_end_neutral": {
                            "messages": [
                                "i appreciate you trying... but it's more complicated than that",
                                "i'll keep working through it somehow"
                            ],
                            "options": []
                        }
                    }
                }
            ],
            "reports": {
                "alex": {
                    "good": {
                        "title": "A Proactive Friend",
                        "summary": "In this conversation, you prioritized honesty and accountability, even when it was difficult. You pushed your friend to do the right thing and take responsibility for their actions. This approach may have felt a little harsh, but it ultimately helped them face their problems head-on. This is an example of assertive and supportive communication."
                    },
                    "bad": {
                        "title": "An Enabler",
                        "summary": "You chose to enable your friend's poor decisions by either ignoring the problem or encouraging them to avoid responsibility. While this might have felt like the 'easy' or 'supportive' option in the moment, it ultimately led to a negative consequence for your friend. This highlights the dangers of passive or conflict-avoidant communication."
                    },
                    "neutral": {
                        "title": "A Bystander",
                        "summary": "You took a neutral stance, avoiding direct conflict or strong advice. This approach kept you out of the drama but provided little real help to your friend. While it's not always your place to solve someone's problems, a true friend offers more than just a passing ear."
                    }
                },
                "davis": {
                    "good": {
                        "title": "Proactive and Responsible",
                        "summary": "You demonstrated proactive and responsible communication. Instead of making excuses, you took ownership of the situation, acknowledged your part in the problem, and presented a solution. This style shows you are mature and capable of handling conflict and difficult situations, which is a key part of effective communication."
                    },
                    "bad": {
                        "title": "Defensive and Uncooperative",
                        "summary": "Your responses were defensive and uncooperative. You focused on blaming others and avoiding responsibility, which only escalated the problem. This shows an aggressive and ineffective communication style that ultimately led to a negative outcome. It's a reminder that even when things are unfair, how we react matters."
                    },
                    "neutral": {
                        "title": "Passive and Unengaged",
                        "summary": "You were passive and disengaged in this conversation. While you didn't directly escalate the conflict, you also didn't take any proactive steps to solve it. This highlights the consequences of avoiding difficult conversations and letting problems fester. It shows that sometimes, inaction can be just as harmful as a bad choice."
                    }
                },
                "maya": {
                    "good": {
                        "title": "An Empathetic Listener",
                        "summary": "You excelled at empathetic listening and validated your friend's feelings without trying to 'fix' them. Your responses were supportive and non-judgmental, which helped your friend feel safe and understood. This is a crucial aspect of building and maintaining a strong, trusting friendship."
                    },
                    "bad": {
                        "title": "A Distant Friend",
                        "summary": "Your responses were dismissive, unhelpful, or even hurtful. You either minimized their feelings, offered unsolicited advice, or shut down the conversation entirely. This led to a breakdown in communication and a loss of trust. This shows that a lack of empathy can damage a relationship, even with the best intentions."
                    },
                    "neutral": {
                        "title": "An Ineffective Helper",
                        "summary": "You tried to help, but your responses came across as a bit generic or overly focused on giving advice rather than listening. Your intentions were good, but you didn't quite meet your friend's emotional needs. This demonstrates that effective communication requires more than just trying to solve a problem—it requires genuine understanding."
                    }
                }
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.showInitialState();
    }

    bindEvents() {
        // 联系人点击事件
        document.querySelectorAll('.contact').forEach(contact => {
            contact.addEventListener('click', (e) => {
                const contactName = e.currentTarget.dataset.contact;
                console.log('Contact clicked:', contactName);
                this.selectContact(contactName);
            });
        });

        // 重置按钮事件
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.reset();
        });

        // 再试一次按钮事件
        document.getElementById('try-again-btn').addEventListener('click', () => {
            this.reset();
        });

        // 选项按钮事件
        document.getElementById('chat-options').addEventListener('click', (e) => {
            if (e.target.classList.contains('option-button') && !this.isWaitingForResponse) {
                const nextState = e.target.dataset.nextState;
                if (nextState) {
                    this.handleUserResponse(nextState);
                }
            }
        });
    }

    selectContact(contactName) {
        this.currentContact = contactName;
        this.currentState = 'start';

        // 隐藏欢迎界面，显示聊天界面
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('chat-window').style.display = 'flex';

        // 更新UI
        document.querySelectorAll('.contact').forEach(c => c.classList.remove('active'));
        document.querySelector(`[data-contact="${contactName}"]`).classList.add('active');

        // 更新聊天头部
        // Create mapping between data-contact values and actual contact names
        const contactMapping = {
            'alex': 'Victor Ruan',
            'ms_davis': 'Mr. Dave',
            'maya': 'Maya'
        };

        const actualContactName = contactMapping[contactName];
        console.log('Looking for contact:', contactName, '->', actualContactName);

        const contact = this.conversationData.contacts.find(c => c.name === actualContactName);

        if (!contact) {
            console.error('Contact not found! Available contacts:', this.conversationData.contacts.map(c => c.name));
            return;
        }

        console.log('Found contact:', contact.name);
        document.getElementById('chat-avatar').src = contact.avatar;
        document.querySelector('.chat-contact-name').textContent = contact.name;

        // 清空消息和选项
        document.getElementById('chat-messages').innerHTML = '';
        document.getElementById('chat-options').innerHTML = '';

        // 开始对话
        this.startConversation();
    }

    startConversation() {
        if (!this.currentContact || !this.currentState) return;

        // Create mapping between data-contact values and actual contact names
        const contactMapping = {
            'alex': 'Victor Ruan',
            'ms_davis': 'Mr. Dave',
            'maya': 'Maya'
        };

        const actualContactName = contactMapping[this.currentContact];
        const contact = this.conversationData.contacts.find(c => c.name === actualContactName);

        if (!contact) {
            console.error('Contact not found:', this.currentContact);
            return;
        }

        const scenario = contact.scenarios[this.currentState];

        if (scenario && scenario.messages) {
            this.displayAIMessages(scenario.messages);
        }
    }

    displayAIMessages(messages) {
        let delay = 0;

        messages.forEach((message, index) => {
            setTimeout(() => {
                this.addMessage(message, 'ai');

                // 如果是最后一条消息，显示选项
                if (index === messages.length - 1) {
                    setTimeout(() => {
                        this.displayOptions();
                        this.isWaitingForResponse = false;

                        // 启用选项按钮
                        const optionButtons = document.querySelectorAll('.option-button');
                        optionButtons.forEach(button => button.classList.remove('disabled'));
                    }, 500);
                }
            }, delay);
            delay += 1000; // 每条消息间隔1秒
        });
    }

    displayOptions() {
        if (!this.currentContact || !this.currentState) return;

        // Create mapping between data-contact values and actual contact names
        const contactMapping = {
            'alex': 'Victor Ruan',
            'ms_davis': 'Mr. Dave',
            'maya': 'Maya'
        };

        const actualContactName = contactMapping[this.currentContact];
        const contact = this.conversationData.contacts.find(c => c.name === actualContactName);

        if (!contact) {
            console.error('Contact not found:', this.currentContact);
            return;
        }

        const scenario = contact.scenarios[this.currentState];
        const optionsContainer = document.getElementById('chat-options');

        optionsContainer.innerHTML = '';

        if (scenario && scenario.options && scenario.options.length > 0) {
            scenario.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option.text;
                button.dataset.nextState = option.next_state;
                optionsContainer.appendChild(button);
            });

            // 如果正在等待响应，禁用所有选项按钮
            if (this.isWaitingForResponse) {
                const optionButtons = document.querySelectorAll('.option-button');
                optionButtons.forEach(button => button.classList.add('disabled'));
            }
        } else {
            // 对话结束，显示报告
            setTimeout(() => {
                this.showReport();
            }, 1000);
        }
    }

    handleUserResponse(nextState) {
        // 防止多次点击 - 如果已经在等待响应，直接返回
        if (this.isWaitingForResponse) {
            return;
        }

        // Create mapping between data-contact values and actual contact names
        const contactMapping = {
            'alex': 'Victor Ruan',
            'ms_davis': 'Mr. Dave',
            'maya': 'Maya'
        };

        const actualContactName = contactMapping[this.currentContact];
        const contact = this.conversationData.contacts.find(c => c.name === actualContactName);

        if (!contact) {
            console.error('Contact not found:', this.currentContact);
            return;
        }

        // 立即禁用所有选项按钮
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => button.classList.add('disabled'));

        // 设置等待状态
        this.isWaitingForResponse = true;

        // 添加用户消息到历史
        const scenario = contact.scenarios[this.currentState];
        const selectedOption = scenario.options.find(opt => opt.next_state === nextState);

        if (selectedOption) {
            this.addMessage(selectedOption.text, 'user');
        }

        // 更新状态
        this.currentState = nextState;

        // 显示AI回复
        setTimeout(() => {
            this.startConversation();
        }, 500);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = `message-bubble ${sender}`;
        bubbleDiv.textContent = text;

        messageDiv.appendChild(bubbleDiv);
        messagesContainer.appendChild(messageDiv);

        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 添加到历史
        this.messageHistory.push({
            text,
            sender,
            timestamp: new Date()
        });
    }

    showReport() {
        const reportModal = document.getElementById('report-modal');
        const reportTitle = document.getElementById('report-title');
        const reportSummary = document.getElementById('report-summary');

        // 确定结局类型
        let outcome = 'neutral'; // 默认

        if (this.currentState.includes('good')) {
            outcome = 'good';
        } else if (this.currentState.includes('bad')) {
            outcome = 'bad';
        }

        // 获取报告内容 - 使用映射来获取正确的报告键
        const contactMapping = {
            'alex': 'alex',
            'ms_davis': 'davis',
            'maya': 'maya'
        };

        const reportKey = contactMapping[this.currentContact];
        const report = this.conversationData.reports[reportKey][outcome];
        reportTitle.textContent = report.title;
        reportSummary.textContent = report.summary;

        // 显示模态框
        reportModal.style.display = 'flex';
    }

    reset() {
        // 重置状态
        this.currentContact = null;
        this.currentState = null;
        this.messageHistory = [];
        this.isWaitingForResponse = false;

        // 清除所有选项按钮的禁用状态
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => button.classList.remove('disabled'));

        // 显示欢迎界面，隐藏聊天界面
        document.getElementById('welcome-screen').style.display = 'flex';
        document.getElementById('chat-window').style.display = 'none';

        // 重置UI
        document.querySelectorAll('.contact').forEach(c => c.classList.remove('active'));
        document.getElementById('chat-messages').innerHTML = '';
        document.getElementById('chat-options').innerHTML = '';
        document.querySelector('.chat-contact-name').textContent = '';

        // 隐藏报告模态框
        document.getElementById('report-modal').style.display = 'none';
    }

    showInitialState() {
        // 初始状态现在显示欢迎界面，不需要在这里添加消息
        // 欢迎界面已经在HTML中定义好了
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new WeChatApp();
});