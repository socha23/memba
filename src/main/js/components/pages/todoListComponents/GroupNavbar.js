import React from 'react'
import PropTypes from 'prop-types'
import {encodeQuery, withRouterWithQuery} from "../../../routerUtils";
import sharingLogic from '../../../logic/sharingLogic'
import todoLogic from '../../../logic/todoLogic'
import {ToolbarButton, BrandedNavbar} from '../../structural/PageTopNavbar'

export default withRouterWithQuery((params) => {
    if (todoLogic.isRootId(params.groupId)) {
        return <RootNavbar {...params}/>
    }
    const group = todoLogic.findGroupById(params.groupId);
    if (group == null) {
        params.history.push("/");
    } else {
        return <SizeChangingNavbar {...params} group={group}/>
    }
});


const Z_TOOLBAR_BUTTONS = 3;
const Z_BLOCK_TITLE = 2;
const Z_SMALL_TOOLBAR = 1;

const BLOCK_TITLE_HEIGHT = 140;
const SMALL_TITLE_HEIGHT = 50;

const RootNavbar = ({showCompleted, onToggleShowCompleted}) => <div>
    <BrandedNavbar>
        <RootRightButtons showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
    </BrandedNavbar>
</div>;

class SizeChangingNavbar extends React.Component {
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
            <SmallToolbar color={this.props.group.color}/>
            <NavButtons group={this.props.group} showCompleted={this.props.showCompleted}
                        onToggleShowCompleted={this.props.onToggleShowCompleted}>
                <div style={{
                    color: "white",
                    fontSize: 20,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "none"
                }} className="smallTitle">{this.props.group.text}</div>
            </NavButtons>
            <BlockTitle group={this.props.group}/>
        </div>

    };

    componentDidMount() {
        $(window).scroll(() => {
            const pos = $(window).scrollTop();
            if (pos > BLOCK_TITLE_HEIGHT - 50) {
                $(".bigTitle").fadeOut();
                $(".smallTitle").fadeIn();
            } else {
                $(".bigTitle").fadeIn();
                $(".smallTitle").fadeOut();
            }
        });
    }
}

const BlockTitle = ({group}) => {
    const shareInfo = sharingLogic.getUsersItemIsSharedWith(group).length === 0 ?
        <span/> : <div className="bigTitle" style={{
            maxWidth: 300,
            position: "absolute",
            bottom: 2,
            left: 4,
            fontSize: 14,
            textShadow: "none"
        }}>with: {sharingLogic.getUsersItemIsSharedWithDescFull(group)}</div>;


    return <div id="blockTitle" style={{
        backgroundColor: group.color,
        position: "relative",
        zIndex: Z_BLOCK_TITLE,
        marginBottom: 1
    }}>
        <div className="container"  style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: BLOCK_TITLE_HEIGHT,
            paddingTop: 20,
            paddingBottom: 20,
            color: "white",
            fontSize: 36,
        }}>
            <span className={"bigTitle"}>{group.text}</span>
            {shareInfo}
        </div>
    </div>;
};

const SmallToolbar = ({color, children, className=""}) => <div className={className} style={{
    zIndex: Z_SMALL_TOOLBAR,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    padding: 0,
    backgroundColor: color,
    borderBottom: "1px solid #444",
}}>
    <div className={"container"} style={{
        height: SMALL_TITLE_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
    }}>
    {children}
    </div>

</div>;


const NavButtons = ({group, showCompleted, onToggleShowCompleted, children}) => <div className="container" style={{
    zIndex: Z_TOOLBAR_BUTTONS,
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    padding: 0,
    height: SMALL_TITLE_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}}>
    <BackButton groupId={group.groupId}> {children}</BackButton>
    <GroupRightButtons groupId={group.id} showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
</div>;


const BackButton = withRouterWithQuery(({groupId, history, children}) => <div
    style={{
        cursor: "pointer",
        minWidth: 50,
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        overflow: "hidden"
    }} onClick={() => {history.push(encodeQuery('/', {groupId: groupId}))}}>
    <ToolbarButton
        className="fas fa-backward"
        style={{zIndex: Z_TOOLBAR_BUTTONS}}
    />
    {children}
</div>);


const RootRightButtons = ({showCompleted, onToggleShowCompleted}) => {
    return <div id="smallToolbar" className="btn-toolbar" style={{display: "flex", flexWrap: "nowrap"}}>
        <ReorderGroupButton groupId={"root"}/>
        <ShowCompletedButton showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
    </div>
};

const GroupRightButtons = ({groupId, showCompleted, onToggleShowCompleted}) => {
    return <div id="smallToolbar" className="btn-toolbar" style={{display: "flex", flexWrap: "nowrap"}}>
        <EditGroupButton groupId={groupId}/>
        <ReorderGroupButton groupId={groupId}/>
        <ShowCompletedButton showCompleted={showCompleted} onToggleShowCompleted={onToggleShowCompleted}/>
    </div>
};

const ShowCompletedButton = ({showCompleted, onToggleShowCompleted}) => <ToolbarButton
    className="far fa-check-square"
    style={{zIndex: Z_TOOLBAR_BUTTONS}}
    active={showCompleted}
    onClick={() => onToggleShowCompleted()}
/>;

const EditGroupButton = withRouterWithQuery(({history, groupId}) => <ToolbarButton
    className="fas fa-cog"
    onClick={() => {history.push(encodeQuery("/group/" + groupId, {groupId: groupId}))}}
/>);

const ReorderGroupButton = withRouterWithQuery(({history, groupId}) => <ToolbarButton
    className="fas fa-sort"
    onClick={() => {history.push(encodeQuery("/reorder/" + groupId))}}
/>);

