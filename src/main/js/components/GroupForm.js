import React from 'react'
import todoLogic from '../logic/todoLogic'
import ColorPicker from './ColorPicker'
import DeleteButton from './DeleteButton'
import GroupSelect from "./GroupSelect";


const GroupForm = ({item, onChangeFields, createMode}) => <div>
    <GroupInput value={item.text} onChangeValue={v => onChangeFields({text: v})} autofocus={createMode}/>
    <ColorPicker value={item.color} onChangeValue={v => onChangeFields({color: v})}/>
    {
        createMode ? <span/> : <GroupSelect
            value={item.groupId}
            onChangeValue={v => onChangeFields({groupId: v})}
            disabledId={item.id}
        />
    }
    {
        createMode ? <span/> : <DeleteButton
            item={item}
            onDelete={() => todoLogic.deleteGroup(item.id)}
            buttonTitle="Delete group"
            message="Are you sure you want to delete this group? Its members will be moved up."
        />
    }

</div>;

export default GroupForm;

class GroupInput extends React.Component {
    componentDidMount() {
        if (this.props.autofocus) {
            this.input.focus();
        }
    }

    render() {
        return <div className="form-group" style={{marginBottom: 6}}>
            <input id="description"
                      ref={r => {
                          this.input = r
                      }}
                      type="text"
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
