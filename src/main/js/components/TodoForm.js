import React from 'react'
import ColorPicker from './ColorPicker'
import GroupSelectFormSection from './GroupSelectFormSection'
import TodoCompletedFormSection from "./TodoCompletedFormSection";
import WhenFormSection from "./WhenFormSection";
import SendNotificationButton from "./dev/SendNotificationButton";

const TodoForm = ({item, onChangeFields, createMode, onSubmit}) => <div>
    <TodoTextInput
        value={item.text}
        onChangeValue={v => onChangeFields({text: v})}
        autofocus={createMode}
        onEnterPressed={createMode ? onSubmit : () => {}}
    />
    {/*<ColorPicker value={item.color} onChangeValue={v => onChangeFields({color: v})}/>*/}
    <WhenFormSection value={item.when} onChangeValue={v => onChangeFields({when: v})} style={{borderTop: "none"}}/>
    <TodoCompletedFormSection value={item.completed} onChangeValue={v => onChangeFields({completed: v})}/>
    
    <GroupSelectFormSection
                value={item.groupId}
                onChangeValue={v => onChangeFields({groupId: v})}
                disabledId={item.id}
            />
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
                      onKeyDown={(e) => {
                          if (e.keyCode == 13 && e.shiftKey == false) {
                              this.props.onEnterPressed();
                          }
                      }}
                      placeholder="Description..."

            />
        </div>
    }
}
