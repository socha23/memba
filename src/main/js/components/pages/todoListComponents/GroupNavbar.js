import React from 'react'
import PropTypes from 'prop-types'

import {encodeQuery, withRouterWithQuery} from "../../../routerUtils";

import sharingLogic from '../../../logic/sharingLogic'
import todoLogic from '../../../logic/todoLogic'

import {ToolbarButton} from '../../structural/PageTopNavbar'

export default withRouterWithQuery((params) => {
    const group = todoLogic.findGroupById(params.groupId);
    if (group == null) {
        params.history.push("/");
    } else {
        return <GroupNavbar {...params} group={group}/>
    }
});


const Z_TOOLBAR_BUTTONS = 3;
const Z_BLOCK_TITLE = 2;
const Z_SMALL_TOOLBAR = 1;

const BLOCK_TITLE_HEIGHT = 140;
const SMALL_TITLE_HEIGHT = 50;


class GroupNavbar extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
        showCompleted: PropTypes.bool,
        onToggleShowCompleted: PropTypes.func.isRequired
    };

    render() {
        return <div id="navbar" style={{
            position: "relative",
            overflow: "hidden",
            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)"
        }}>
            <SmallToolbar group={this.props.group}/>
            <NavButtons group={this.props.group} showCompleted={this.props.showCompleted}
                        onToggleShowCompleted={this.props.onToggleShowCompleted}>
                <div style={{
                    color: "white",
                    fontSize: 20,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "none"
                }} ref={s => {this.smallTitleMounted(s)}}>{this.props.group.text}</div>
            </NavButtons>
            <BlockTitle group={this.props.group}/>
        </div>

    };

    smallTitleMounted(elem) {
        this.smallTitleElem = elem;
        $(window).scroll(() => {
            const pos = $(window).scrollTop();
            if (pos > BLOCK_TITLE_HEIGHT - 50) {
                $(this.smallTitleElem).fadeIn();
            } else {
                $(this.smallTitleElem).fadeOut();
            }
        });
    }
}

const BlockTitle = ({group}) => {
    const shareInfo = sharingLogic.getUsersItemIsSharedWith(group).length === 0 ?
        <span/> : <div style = {{
            maxWidth: 300,
            position: "absolute",
            bottom: 2,
            left: 4,
            fontSize: 14,
            textShadow: "none"
        }}>with: {sharingLogic.getUsersItemIsSharedWithDescFull(group)}</div>;


    return <div id="blockTitle" className="container" style={{
            backgroundColor: group.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: BLOCK_TITLE_HEIGHT,
            paddingTop: 20,
            paddingBottom: 20,
            color: "white",
            fontSize: 36,
            position: "relative",
            zIndex: Z_BLOCK_TITLE,
            /* borderBottom: "1px solid #444",*/
        }}>
            <span>{group.text}</span>
            {shareInfo}
        </div>;
};

const SmallToolbar = ({group}) => <div className="container" style={{
    zIndex: Z_SMALL_TOOLBAR,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    height: SMALL_TITLE_HEIGHT,
    backgroundColor: group.color,
}}/>;


const NavButtons = ({group, showCompleted, onToggleShowCompleted, children}) => <div className="container" style={{
    zIndex: Z_TOOLBAR_BUTTONS,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    padding: 0,
    display: "flex",
    height: SMALL_TITLE_HEIGHT,
    alignItems: "center",
    justifyContent: "space-between"
}}>
    <BackButton group={group}> {children}</BackButton>
    <Toolbar group={group} showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
</div>;


const BackButton = withRouterWithQuery(({group, history, children}) => <div
    style={{
        cursor: "pointer",
        minWidth: 50,
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        overflow: "hidden"
    }} onClick={() => {history.push(encodeQuery('/', {groupId: group.groupId}))}}>
    <ToolbarButton
        className="fas fa-backward"
        style={{zIndex: Z_TOOLBAR_BUTTONS}}
    />
    {children}
</div>);


const Toolbar = withRouterWithQuery(({history, group, showCompleted, onToggleShowCompleted}) => {
    const showCompletedButton = <ToolbarButton
        className="far fa-check-square"
        style={{zIndex: Z_TOOLBAR_BUTTONS}}
        active={showCompleted}
        onClick={() => onToggleShowCompleted()}
    />;

    const editGroupButton = <ToolbarButton
        className="fas fa-cog"
        onClick={() => {history.push(encodeQuery("/group/" + group.id, {groupId: group.id}))}}
    />;

    return <div id="smallToolbar" className="btn-toolbar" style={{display: "flex", flexWrap: "nowrap"}}>
        {editGroupButton}
        {showCompletedButton}
    </div>
});


