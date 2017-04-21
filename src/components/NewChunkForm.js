import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { hashHistory } from 'react-router';

class Tree extends React.Component {

  constructor() {
    super();
    this.state = {
      content: ""
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.submitChunkHandler = this.submitChunkHandler.bind(this);
  }

  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  submitChunkHandler(e){
    e.preventDefault();
    fetch("/newChunk",{
      method:"POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: this.state.content,
        parentchunk: this.props.chunkId
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        content: ""
      });
      hashHistory.push('/Story/' + this.props.treeId + "/" + res._id);
    });
  }

  render() {
    return (
      <Form>
        <textarea onChange={this.handleContentChange} type="text" name="content" rows="10" cols="30" value={this.state.content} placeholder="Write an alternative chunk ..."/>
        <br/>
        <Button onClick={this.submitChunkHandler} type="submit">Submit</Button>
      </Form>
    );
  }
}

Tree.propTypes = {
  chunkId: React.PropTypes.string,
  treeId: React.PropTypes.string
};

export default Tree;
