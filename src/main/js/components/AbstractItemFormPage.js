import React from 'react'
import PropTypes from 'prop-types'
import {LinkWithQuery, encodeQuery, withRouterWithQuery} from '../routerUtils'

import {PageTopNavbar, PageTitle} from './PageTopNavbar'
import PageBody from './PageBody'
import {BorderlessBottomNavbar} from './PageBottomNavbar'

import ButtonIcon from './ButtonIcon'
import ColorPicker from './ColorPicker'

class AbstractItemFormPage extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        title: PropTypes.string,
        saveButtonLabel: PropTypes.string,
        onSave: PropTypes.func.isRequired,
        createMode: PropTypes.bool.isRequired
    };

    static defaultProps = {
        title: "Enter details",
        saveButtonLabel: "Save changes"
    };

    state = {...this.props.item};

    render() {
        return <AbstractEditTodoPageView
            title={this.props.title}
            buttonClass={this.isSubmitEnabled() ? "btn-success" : "btn-primary"}
            buttonContents={this.isSubmitEnabled() ? <span>
                                <ButtonIcon className={"fas fa-check"}/>
                                {this.props.saveButtonLabel}
                            </span>
                            : "Enter description first"}
            item={this.getItem()}
            onChangeFields={values => {this.setState(values)}}
            submitEnabled={this.isSubmitEnabled()}
            onSubmit={() => {this.onSubmit()}}
            createMode={this.props.createMode}
        />;
    }

    isCreateMode() {
        throw new Error("isCreateMode() not implemented");
    }

    isSubmitEnabled() {
        return this.state.text.trim() !== "";
    }

    getItem() {
        return {...this.state}
    }

    onSubmit() {
        this.props.onSave(this.getItem());
        this.props.history.push(encodeQuery("/", {groupId: this.getItem().groupId}));
    }
}

export default withRouterWithQuery(AbstractItemFormPage)

const AbstractEditTodoPageView = ({
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
