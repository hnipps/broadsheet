import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Readability from 'readability';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textContent: '',
      parsedArticle: {}
    };
  }

  componentDidMount() {
    this.getPage();
  }

  getPage = () => {
    axios.get('http://localhost:8000/').then(
      res => {
        console.log(res);
        const doc = document.implementation.createHTMLDocument('New Document');
        const frag = document.createRange().createContextualFragment(res.data);
        doc.body.appendChild(frag);
        console.log('frag', frag);
        console.log('doc', doc);

        const article = new Readability(doc);
        console.log('article', article);
        const parsedArticle = article.parse();
        console.log('parsed', parsedArticle);
        this.setState({
          textContent: parsedArticle.textContent || '',
          parsedArticle
        });
      },
      err => {
        console.error(err);
      }
    );
  };

  render() {
    const { textContent, parsedArticle } = this.state;
    return (
      <div className="App">
        <div className="dangerous" dangerouslySetInnerHTML={{ __html: parsedArticle.content }} />
        <p className="text-content">{textContent}</p>
      </div>
    );
  }
}

export default App;
