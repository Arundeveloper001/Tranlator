import React, { useState, useEffect } from 'react';
import './App.css'
import {
    Form,
    TextArea,
    Button,
    Icon
} from 'semantic-ui-react';
import axios from 'axios';
import Typed from "react-typed"

export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setdetectedLanguageKey] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [resultText, setResultText] = useState('');
    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
            .then((response) => {
                setdetectedLanguageKey(response.data[0].language)
            })
    }
    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
            .then((response) => {
                setLanguagesList(response.data)
            })
    }, [])

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    const translateText = () => {
        getLanguageSource();

        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
    }

    return (
        <div className='head'>
            <div className="app-header">
                <h2 className="header"><Typed
              strings={[
                "TEXT TRANSLATOR    ",
              ]}
              typeSpeed={150}
              backSpeed={150}
              loop
            /></h2>
            </div>

            <div className='app-body'>
                <div className='form'>
                    <Form>
                        <Form.Field
                            control={TextArea}
                            placeholder='Type Text to Translate..'
                            onChange={(e) => setInputText(e.target.value)}
                            style={{width:'300px'}}
                        />

                        <select className="language-select" onChange={languageKey}>
                            <option> Select Language..</option>
                            {languagesList.map((language) => {
                                return (
                                    <option value={language.code}>
                                        {language.name}
                                    </option>
                                )
                            })}
                        </select><br/>

                        <Button
                            color="orange"
                            size="large"
                            onClick={translateText}
                            style={{width:'150px',color:'orange',paddingLeft:'10px',paddingRight:'10px',paddingTop:'10px',paddingBottom:'10px',borderRadius:'20px 20px'}}
                        >
                            <Icon name='translate' style={{width:'100px',color:'orange'}} />
                            Translate</Button><br/><br/>

                        <Form.Field
                            control={TextArea}
                            placeholder='Your Result Translation..'
                            value={resultText}
                            style={{width:'300px'}}
                        />

                        
                    </Form>
                </div>
            </div>
        </div>
    )
}