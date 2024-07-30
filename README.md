# How to use
## Poem Input
First, input your text selection into the large text input section in the top left of the webpage. Or, click on the "Click Here" in the description to auto-fill a random poem or other chunk of text.

## Poem Visualization
The large square in the top right is where your poem will be visualized. Here, once you click the large "Visualize" button in the bottom right of the screen, you will see a point for each word in your poem as well as a line that shows the trajectory of the poem overtime. Hover over various points to see which word they each correspond to. Here you can also see the location of each of your trend words which I will describe below.

## Trends
In the "Trends" section, you can input up to 9 words that can be used to show trends throughout the poem. Either type a word in the box and press ENTER, or click the cursor icon to directly click on the poem graph and add the closest word to where you just clicked. To stop tracking a trend word, simply click on it. To choose between using euclidean distance and cosine distance as a similarity metric, use the buttons.

## Trend Visualization
The long rectangle in the middle of the website is the trend visualizer. Each column represents one word from the poem (in order as presented in the poem), and each line represents the similarity of a trend word to the poem over time. This similarity is computed as the distance between the trend word and the poem word, and the lines are color coded for each trend word. The more similar the two words are, the closer the line will be to the top. By hovering over one column, the corresponding word will be displayed in the top left of the rectangle and the corresponding point in the Poem visualization will be highlighted. (Note that the rectangle will also be highlighted when that point is hovered over).

# Data and Methods
## So, what is even going on here?
This text visualizer is designed to provide a novel way of exploring poetry and other forms of text. It uses NLP techniques to convert the input text into word vectors and then constructs various visualizations based on those vectors. The aim of this project is to offer a tool that can help artists understand their poetry better and also help computer scientists learn more about word2vec and its applications.

## Where is the data from?
The word vectors are from a pretrained model called GloVe (Global Vectors for Word Representation) which was created by Stanford researchers Jeffrey Pennington, Richard Socher, and Christopher D. Manning. The researchers created these word vectors using an unsupervised model that looked at the frequencies with which each word appears next to other words on wikipedia and groups them based on these similarities. Through a process of PCA (Principle Component Analysis), these 50 dimensional word vectors were converted to 2 dimensions for the purpose of visualizing.

# Was this even a good idea?
## What are these graphs even showing?
I won't lie, this program doesn't work as well as I had hoped. Or at least it doesn't work how I expected. One major oversight I had when conjuring up this idea was that words from popular poems will probably end up very condensed because these words tend to appear next to each other a fair amount. It's not like poems are just a string of randomly sampled words. They use common grammar a lot of the time, so the visualization usually ends up looking like one dense cluster with a few points far off for the less common words. This is also kind of a strawman representation of word vectors since we are only visualizing two dimensions when often times word vectors can have upwards of 300 dimensions. A 300 dimension word vector visualizer would be much more interesting, but until we have web browsers in 300 dimensions, we're stuck with this.

## Who would use this?
Artists, maybe? Technologists? It could be used to try to better understand word vectors and get a better intuition for what they are quantizing; but honestly, I think this program is mostly just to be used for fun. Put in your name and your significant other's name and see how close you are. Put in a funny quote and see if it draws a cool picture. Try to come up with a poem that means something but also draws something funny. The possibilities are endless.

## Was making this worth it?
This is always the question isn't it? I think it was worth making because I had a lot of fun and learned a lot along the way. It's definitely more of an artistic approach to visualization than most projects usually are, but I think there's something beautiful in the absurdity of all of it. One of the greatest parts of the program is clicking around randomly to see what words you can find. Something about randomly stumbling upon "http://www.deathpenaltyinfo.org" in the data set is just so amusing to me. Something I learned from Ge Wang this year is that one of the most important qualities of artists is that we make things that wouldn't have otherwise been made. I think this might be one of those things.
