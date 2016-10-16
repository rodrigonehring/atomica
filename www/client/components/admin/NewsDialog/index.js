import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        title: '',
        content: '',
        imageButton: '',
      },
      errors: {},
    };
  }

  onChange = ({ target }) => {
    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        [target.id]: '',
      },
      inputs: {
        ...this.state.inputs,
        [target.id]: target.value,
      }
    });
  }

  handleSubmit = () => {
    let { title, content, imageButton } = this.state.inputs, errors = {};

    if (!title)
      errors.title = 'Precisa de um título!';
    else if (title.length < 4)
      errors.title = 'Precisa ter mais de 4 dígitos!';

    if (!content)
      errors.content = 'Precisa de conteúdo!';

    if (!imageButton)
      errors.imageButton = 'Precisa de uma imagem!';

    if (errors.title || errors.content || errors.imageButton)
      this.setState({...this.state, errors: errors});
    else {
      let formData = new FormData();
      formData.append('image', this.refs.file.files[0]);
      formData.append('title', this.state.inputs.title);
      formData.append('content', this.state.inputs.content);
      this.props.addPost(formData).then(() => {
        this.props.actions.newsDialogClose();
      });
    }
  }

  render() {
    return (
      <Dialog
        title="Adicionar notícia!"
        modal={false}
        open={this.props.NewsDialog.open}
      >
        <TextField
             floatingLabelText="Titulo"
             fullWidth={true}
             id="title"
             errorText={this.state.errors.title}
             value={this.state.inputs.title}
             onChange={this.onChange}
         /><br />

         <TextField
            rows={5}
            multiLine={true}
            id="content"
            onChange={this.onChange}
            errorText={this.state.errors.content}
            value={this.state.inputs.content}
            fullWidth={true}
            floatingLabelText="News"
         />
         <br />
         <br />

         <input type="file" id="imageButton" onChange={this.onChange} ref="file"></input>
         <p>
           {this.state.errors.imageButton}
         </p>

         <br />
         <br />

         <RaisedButton label="Enviar" primary={true} onClick={this.handleSubmit}  />
         <RaisedButton label="Cancelar" primary={false} onClick={this.props.actions.newsDialogClose}  />

      </Dialog>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(({ NewsDialog }) => ({NewsDialog}), mapDispatchToProps)(Form);
