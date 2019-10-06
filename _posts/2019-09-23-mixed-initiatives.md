---
date: 2019-09-23 17:09:50+08:00
layout: post
title: 混合主动交互模式
categories: 技术随笔
tags: 
---

混合主动(mixed-initiative)是一种人机交互的模式，在完成任务的过程中，人与机器会互相给出意见并主导任务。有混合主动模式，那也有不混合的模式，即人或机器占主导地位的模式。

用对话的例子比较好说明，比如两个人要去吃饭，如果是一方主导：

```
小张：我们周五晚上去吃饭吧？
小李：好啊。
小张：我知道五道口有一家不错的火锅店，去那里吧？
小李：好啊，那就这样定了，周五再联系。
```

如果是双方互相给意见：

```
小张：我们周五晚上去吃饭吧？
小李：好啊，去哪里吃呢？
小张：我知道五道口有一家不错的火锅店，去那里吧？
小李：我想吃清淡一点的，我们去XX吧。
小张：好啊，那就这样定了，周五再联系。
```

混合主动的概念虽然是70年代提出的，但定义和用法一直比较模糊。在1999年的SIGCHI人机交互小组会议上，微软研究院的Eric Horvitz介绍了他们总结的混合主动的设计原则，并给出了一个叫做LookOut的程序作为例子。这一设计原则可以让自动化程序和人有机结合起来。

以下是设计原则的英文：

1. **Developing significant value-added automation.** It is important to provide automated services that provide genuine value over solutions attainable with direct manipulation.
2. **Considering uncertainty about a user’s goals.** Computers are often uncertain about the goals and current the focus of attention of a user. In many cases, systems can benefit by employing machinery for inferring and exploiting the uncertainty about a user’s intentions and focus.
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

1. **开发能添加价值的自动化。** 自动化服务需要提供真正的价值，并能供用户直接操作。
2. **考虑用户目标的不确定性。** 计算机常常不能确定用户的目标和当前的关注点。在许多情况下，系统可以通过某种机制来推断和使用用户目的和关注点的不确定性。
3. **服务触发时机需要考虑用户的注意状态。** 自动化服务和提醒的性质和时机可能是操作的是否有用的一个关键因素。Agent应该使用用户注意的模型，并考虑将操作推迟到分散用户较小的注意力时的效益。
4. **根据效益和不确定性，判断理想的操作。** 在用户目标和注意不确定的情况下采取自动化操作的效益与操作的场合相关。自动化服务的价值可以在考虑操作的预期价值的前提下，通过适合的调用机制来得到加强。
5. **使用对话框来解决主要的不确定性。** 如果系统不确定用户的操作意图，它应该能用一种有效的对话机制和用户互动，并考虑是否有必要打扰用户。
6. **允许有效的直接调用和终止操作。** 具有不确定性的系统常常会错误地调用或者不调用自动化服务。用户可以高效地直接调用或终止自动化服务，以增强提供自动化服务的Agent的价值。
7. **尽量减少对行动和时机的错误猜测带来的成本。** 服务和提醒的设计应该能最小化错误猜测带来的成本，比如添加合理的超时设计和用于拒绝提醒的自然手势设计。
8. **调整精确度的范围，以匹配不确定性和目标的多样。** Agent要能调整服务的精确度以匹配当前的不确定性，从而加强自动化的价值。在不确定的情况下，做得少，但做得对，既能够帮到用户，也能减少不必要的修改和回溯操作。
9. **提供Agent和用户互相合作以完善结果的机制。** 用户常常希望能够完善Agent提供的结果。
10. **利用合适的方式来进行Agent与用户的互动。** Agent要想成为一个好的助手，应该具有满足社会期待的良好的行为举止和礼貌。
11. **保存有关近期操作的工作记忆。** 系统应该保存用户的近期操作，并提供一种让用户高效而自然地利用这一短期记忆的机制。
12. **通过观察进行持续学习。** 自动化服务应该能够通过学习用户的目标和需求更好地与用户进行合作。


下面简单介绍下论文中给出的LookOut程序，这是一个从Outlook的邮件中自动提取信息建立日历的应用。

LookOut会分析收到的信息，提取其中的日期、事件等信息，自动建立日程（基于贝叶斯、SVM分类文本是否可以用于建立日程）。如果它对提取的内容不确定，则会让用户手动操作，或者以更低的精度（天->周）列出。

LookOut还提供一个Social-agent模式，以拟人化的小助手的形象与用户进行交互。

![](/album/genie.jpg)

因为人机互动和对话非常相近，我们也可以借鉴语用学的知识，比如合作原则。

* 量的准则(Maxim of Quantity)：提供所需的信息，不提供冗余信息
* 质的准则(Maxim of Quality)：内容有质量保证
* 关系准则(Maxim of Relevance)：内容要有相关性
* 方式准则(Maxim of Manner): 注意提供信息的方式方法





