import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(comment => {
        if (comment.id === id) {
          return {...comment, isLiked: !comment.isLiked}
        }
        return comment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-app-container">
          <h1 className="header">Comments</h1>
          <div className="header-container">
            <form onSubmit={this.onAddComment} className="input-container">
              <p className="title">Say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                className="input"
                onChange={this.onChangeNameInput}
                value={nameInput}
              />
              <textarea
                value={commentInput}
                rows="6"
                placeholder="Your Comment"
                className="input"
                onChange={this.onChangeCommentInput}
              >
                {commentInput}
              </textarea>
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comments-img"
              alt="comments"
            />
          </div>
          <hr className="line-break" />
          <p className="comments">
            <span className="count">{commentsList.length}</span>Comments
          </p>
          <ul className="comment-list-container">
            {commentsList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                key={eachComment.id}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
