import React from 'react'
import {LinkWithQuery} from '../routerUtils'

import {PageTopNavbar, PageTitle} from "./PageTopNavbar";
import PageBody from './PageBody'
import {BorderlessBottomNavbar} from './PageBottomNavbar'

import ButtonIcon from './ButtonIcon'
import ColorPicker from './ColorPicker'


export default ({
                             title, buttonClass, buttonContents,
                             item, onChangeFields,
                             submitEnabled, onSubmit,
                             createMode
                         }) => <div>
    <PageTopNavbar>
        <div style={{display: "flex", alignItems: "center"}}>
            <LinkWithQuery to="/" query={{groupId: item.groupId}} className="btn btn-primary">
                <ButtonIcon className={"fas fa-backward"}/>Back
            </LinkWithQuery>
            <PageTitle>{title}</PageTitle>
        </div>

    </PageTopNavbar>

    <PageBody>
        <div className="container" style={{padding: 2}}>
            <TodoTextInput value={item.text} onChangeValue={v => onChangeFields({text: v})} autofocus={createMode}/>
            <ColorPicker value={item.color} onChangeValue={v => onChangeFields({color: v})}/>
        </div>
    </PageBody>

    <BorderlessBottomNavbar>
        <button
            className={"btn btn-lg btn-block " + buttonClass}
            disabled={!submitEnabled}
            onClick={submitEnabled ? onSubmit : () => {}}
        >
            {buttonContents}
        </button>
    </BorderlessBottomNavbar>
</div>;

class TodoTextInput extends React.Component {
    componentDidMount() {
        if (this.props.autofocus) {
            this.input.focus();
        }
    }

    render() {
        return <div className="form-group" style={{marginBottom: 6}}>
            <textarea id="description"
                      ref={r => {this.input = r}}
                      rows={5}
                      className="form-control form-control-lg"
                      style={{paddingTop: 3, paddingRight: 5, paddingBottom: 3, paddingLeft: 5}}
                      value={this.props.value}
                      onChange={(e) => {this.props.onChangeValue(e.target.value)}}

                      placeholder="Description..."

            />
        </div>
    }
}
