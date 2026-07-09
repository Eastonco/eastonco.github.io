---
name: Algorithmic Trading
category: interest
summary: Building algo-trading strategies (results pending).
---

# The Night I Tried to Beat the Stock Market with a Neural Network

**WSU · CS 437, Intro to Machine Learning · Senior Year, Spring 2021**

---

It's somewhere around 3am, spring of my senior year, and I'm staring at a terminal window that's been printing `Epoch 847/1000` for the last twenty minutes. This was before AI had eaten the world — before you could ask a model to sanity-check your feature engineering or explain why your loss curve looked wrong. If something broke, you fixed it by rereading the docs, rereading your own code, and rereading it again at an hour when neither of those things should be trusted. CS 437 was my introduction to machine learning, and the final project was the first time I got to pick a problem instead of being handed one. I picked the stock market, because of course I did.

## The Idea

The pitch was simple to say and hard to do: could a neural network look at a handful of technical indicators for SPY — the S&P 500 ETF — and predict whether tomorrow's close would be higher or lower than today's? Not a price target, just direction. Up or down. A coin flip you might be able to load.

I pulled a year's worth of intuition from watching markets and distilled it into features I thought a model could actually learn from: daily volume, percent change from the prior close, and the distance between price and its 50-day and 200-day moving averages — the lines every retail trader has stared at at some point, wondering if crossing above or below one of them actually means anything. I added RSI and MACD on top, two momentum indicators that show up in basically every technical analysis toolkit ever built. All of it pulled live through the Alpha Vantage API, which felt like a small miracle at the time — free, real market data, a few lines of Python away.

## The Build

My original plan was K-Nearest Neighbors. It felt like the right tool: find historical days that looked like today, see what happened next, vote. Early results were bad enough that I scrapped the assumption entirely and rebuilt around a small TensorFlow neural network instead — a single hidden layer, a handful of nodes, nothing exotic. I ran two versions of it in parallel: one trained as a regression problem, minimizing mean squared error against the binary label; one trained more explicitly for classification, watching accuracy climb epoch by epoch.

The rest of the pipeline was the unglamorous part that actually eats the hours — reversing Alpha Vantage's date ordering so price data and indicator data lined up row for row, normalizing every feature so the network wasn't thrown off by volume being in the millions while RSI lived between 0 and 100, splitting 66/33 into train and test to keep myself honest about overfitting. I ran the network for 1000 epochs, which on my laptop at 3am felt like watching a kettle that refused to boil. I benchmarked it against three classical baselines — a Decision Tree, 5-Nearest Neighbors, and K-Means — mostly to prove to myself that the neural network was earning its keep and not just memorizing noise.

## What the Data Actually Said

Here's the part I've come to appreciate more with a few years of distance: the results were humbling. Every model — the decision tree, the nearest-neighbors classifier, the clustering approach, and the neural network itself — landed somewhere in the low-to-high 50s percent accuracy, with only one baseline edging into the low 60s. On a random guess, you'd expect 50%. None of my models blew past that by much.

At the time, that felt like it needed defending. Looking back, it's the most honest and interesting result the project could have produced. If a WSU senior with a free API key and a laptop could reliably predict next-day direction on the most liquid index fund on earth, every quant desk on Wall Street would already know about it — and the opportunity would have vanished the moment it became exploitable. The efficient market hypothesis isn't just a theory you read about in a finance elective; it's something you can watch confirm itself in your own confusion matrix at four in the morning. The real finding of this project wasn't "neural networks predict stocks." It was closer to: markets price in information fast enough that six technical indicators and a small MLP don't get you very far past a coin flip — and being able to say that clearly, with real numbers behind it, is worth more than a good-looking accuracy score would have been.

## Why It Stuck With Me

This was one of the first times I built a complete ML pipeline end to end, by hand, with no scaffolding beyond documentation and stubbornness — pulling live data from an external API, engineering features from scratch, training and comparing multiple model families, and having to explain in plain language why the result was what it was rather than what I'd hoped it would be. There was no autocomplete finishing my thoughts and no assistant to lean on when the gradient wasn't converging the way I expected. Just me, a terminal, and the slow discipline of debugging until it made sense.

I've built a lot since then — production systems at Expedia, AI infrastructure and MCP tooling, side projects that ship to real users. But this was the first one, and the late nights it cost me are part of why the rest came easier.

---

**Stack:** Python · TensorFlow/Keras · scikit-learn · pandas · NumPy · Alpha Vantage API · Google Colab

**Approach:** Time-series feature engineering (SMA/RSI/MACD) → neural network (regression + classification variants) benchmarked against Decision Tree, K-NN, and K-Means baselines for next-day directional prediction on SPY.
