const express        = require('express');
const app            = express();
const cors           = require('cors')
const bodyParser     = require('body-parser')
const {Translate}    = require('@google-cloud/translate');
const projectId      = 'styla-214112';

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

app.listen('80', () => {
  console.log('We are live on port 80');
});

app.get( '/', function ( req, res ) {
    res.send( 'Styla Google Translate Backend' );
} );

app.post( '/', function ( req, res ) {

    const target_language = req.body.target_language;
    const text = req.body.text;

    if (!target_language || !text ){
        console.log('Missing fields error.');
        res.send( {
            "error": "Some fields were missing. target_language and text are bot required"
         } );
        return;
    }

    const translate = new Translate({
        projectId: projectId,
    });

    translate
        .translate(text, target_language)
        .then(results => {
            const translation = results[0];
            console.log( results );
            res.send( {
                "original_text": text,
                "target_language": target_language,
                "translated_text": translation,
            } );
        })
        .catch(err => {
        console.error('ERROR:', err);
        });
} );
