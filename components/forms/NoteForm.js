import { CreateForm, ErrorMessage} from 'react-formation';

const isMinLength = (len) => {
  return (item) => {
    return item.length < len ?
      `Must be ${len} characters` :
      false;
  }
};

const NoteForm = CreateForm({
  schema: {
    subject: {
      label: 'Subject',
      type: isMinLength(20),
      required: true
    },
    content: {
      label: 'Content',
      type: isMinLength(40),
      required: true
    }
  },

  onSuccess(data) {
    const { handleSuccess } = this.props;
    handleSuccess(data);
  },

  render() {
    return (
      <form>
        <div className="form-group">
          <label>Name (error is shown after submit attempt)</label>
          <input
            type="text"
            name="subject"
            valueLink={this.linkField('subject')}
          />
          <ErrorMessage field="subject" />
        </div>

        <div className="form-group">
          <label>Email (error is shown immediately)</label>
          <input 
            type="text"
            name="content"
            valueLink={this.linkField('content')}
          />
          <ErrorMessage show={true} field="content" />
        </div>

        <p><button onClick={this.submitForm}>Submit</button></p>
    </form>
    );
  }
});

export default NoteForm;
