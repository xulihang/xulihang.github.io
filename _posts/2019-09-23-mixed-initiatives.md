---
date: 2019-09-23 17:09:50+08:00
layout: post
title: 混合主动交互模式
categories: 技术随笔
tags: 
---

在1999年的SIGCHI人机交互小组会议上，微软研究院的Eric Horvitz介绍了叫做混合主动(Mixed-initiative)的人机交互模型，提出了一系列设计原则，并给出了一个叫做LookOut的程序作为例子。这一设计原则可以让自动化程序和人有机结合起来。之所以叫做混合主动，是因为由人与机器着交替主导任务的完成。

以下是设计原则的英文：

1. **Developing significant value-added automation.** It is important to provide automated services that provide genuine value over solutions attainable with direct manipulation.
2. Considering uncertainty about a user’s goals. Computers are often uncertain about the goals and current the focus of attention of a user. In many cases, systems can benefit by employing machinery for inferring and exploiting the uncertainty about a user’s intentions and focus.
3. **Considering the status of a user’s attention in the timing of services.** The nature and timing of automated services and alerts can be a critical factor in the costs and benefits of actions. Agents should employ models of the attention of users and consider the costs and benefits of deferring action to a time when action will be less distracting.
4. **Inferring ideal action in light of costs, benefits, and uncertainties.**  Automated  actions  taken  under uncertainty in a user’s goals and attention are associated with context-dependent costs and benefits. The value of automated services can be enhanced by guiding their invocation with a consideration of the expected value of taking actions.
5. **Employing dialog to resolve key uncertainties.** If a system is uncertain about a user’s intentions, it should be able to engage in an efficient dialog with the user, considering the costs of potentially bothering a user needlessly.
6. **Allowing  efficient  direct  invocation  and termination.** A system operating under uncertainty will sometimes make poor decisions about invoking— or not invoking—an automated service. The value of agents providing automated services can be enhanced by providing efficient means by which users can directly invoke or terminate the automated services.
7. **Minimizing the cost of poor guesses about action and timing.** Designs for services and alerts should be undertaken with an eye to minimizing the cost of poor guesses, including appropriate timing out and natural gestures for rejecting attempts at service.
8. **Scoping precision of service to match uncertainty, variation in goals.** We can enhance the value of automation by giving agents the ability to gracefully degrade the precision of service to match current uncertainty. A preference for “doing less” but doing it correctly under uncertainty can provide user’s with a valuable advance towards a solution and minimize the need for costly undoing or backtracking.
9. **Providing mechanisms for efficient agent−user collaboration to refine results.** We should design agents with the assumption that users may often wish to complete or refine an analysis provided by an agent.
10. **Employing socially appropriate behaviors for agent−user interaction.** An agent should be endowed with tasteful default behaviors and courtesies that match social expectations for a benevolent assistant.
11. **Maintaining  working  memory  of  recent interactions.** Systems should maintain a memory of recent interactions with users and provide mechanisms that allow users to make efficient and natural references to objects and services included in “shared” short-term experiences.
12. **Continuing to learn by observing.** Automated services should be endowed with the ability to continue to become better at working with users by continuing to learn about a user’s goals and needs.

以下是翻译：

暂未完成。

下面简单介绍下论文中给出的LookOut程序，这是一个从Outlook的邮件中自动提取信息建立日历的应用。

LookOut会分析收到的信息，提取其中的日期、事件等信息，自动建立日程（基于贝叶斯、SVM分类文本是否可以用于建立日程）。如果它对提取的内容不确定，则会让用户手动操作，或者以更低的精度（天->周）列出。

LookOut还提供一个Social-agent模式，以拟人化的小助手的形象与用户进行交互。

![](/album/genie.jpg)





