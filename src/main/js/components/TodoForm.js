import React from 'react'
import todoLogic from '../logic/todoLogic'
import ColorPicker from './ColorPicker'
import DeleteButton from './DeleteButton'
import GroupSelect from './GroupSelect'

const TodoForm = ({item, onChangeFields, createMode}) => <div>
    <TodoTextInput value={item.text} onChangeValue={v => onChangeFields({text: v})} autofocus={createMode}/>
    <ColorPicker value={item.color} onChangeValue={v => onChangeFields({color: v})}/>
    <GroupSelect
                value={item.groupId}
                onChangeValue={v => onChangeFields({groupId: v})}
                disabledId={item.id}
            />
    {
        createMode ? <span/> : <DeleteButton style={{marginTop: 30}} item={item} onDelete={() => todoLogic.deleteTodo(item.id)}/>
    }
</div>;

export default TodoForm;

class TodoTextInput extends React.Component {
    componentDidMount() {
        if (this.props.autofocus) {
            this.input.focus();
        }
    }

    render() {
        return <div className="form-group" style={{marginBottom: 6}}>
            <textarea id="description"
                      ref={r => {
                          this.input = r
                      }}
                      rows={5}
                      className="form-control form-control-lg"
                      style={{paddingTop: 3, paddingRight: 5, paddingBottom: 3, paddingLeft: 5}}
                      value={this.props.value}
                      onChange={(e) => {
                          this.props.onChangeValue(e.target.value)
                      }}

                      placeholder="Description..."

            />
        </div>
    }
}
