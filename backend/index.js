const express = require('express');
const app = express();
app.use(express.json());
app.listen(3333);

//cors
const cors = require('cors');
app.use(cors());
app.options('*', cors());


//open ai
const { Configuration, OpenAIApi } = require('openai');
const config = new Configuration({
    //apiKey: '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',
    apiKey: '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',
});
const openai = new OpenAIApi(config);

//POST
app.post('/api/call', async (req, res) => {

    const runPrompt = async () => {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: req.body.prompt,
            max_tokens: 1024,
            temperature: 0.8
        });
        return response.data;
    };

    const responseFromAPI = await runPrompt();

    console.log(responseFromAPI)
    res.send(responseFromAPI.choices[0].text)


})
