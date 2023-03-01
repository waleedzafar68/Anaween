import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

import { ReactComponent as Home } from "../../static/svgs/home.svg";
import { ReactComponent as Notifications } from "../../static/svgs/notifications.svg";
import { ReactComponent as Messages } from "../../static/svgs/messages.svg";
import { ReactComponent as UserSVG } from "../../static/svgs/user.svg";
import { ReactComponent as Share } from "../../static/svgs/share.svg";
import { ReactComponent as Comment } from "../../static/svgs/comment.svg";
import { ReactComponent as Retweet } from "../../static/svgs/retweet.svg";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/blogs/action";
import { addComment, getComments, likeComment } from "../../redux/comments/action";
import { addReply } from "../../redux/replies/action";
import { getNotificationsByUserId, updateNotificationStatus } from "../../redux/notifications/action";
import { ToggleModeContext } from "../../context/toggle-mode";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isPro = sessionStorage.getItem('isPro');
  const blogReducer = useSelector((state) => state.blogReducer);
  const loading = blogReducer.loading || 0;
  const blogData = blogReducer.data?.results || []
  const commentReducer = useSelector((state) => state.commentReducer);
  const commentData = commentReducer.data?.results || [];
  const notificationReducer = useSelector((state) => state.notificationReducer);
  const notifications = notificationReducer.data?.results || [];

  const [comment, setComment] = useState('');
  const [replyMessage, setReplyMessage] = useState('')
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);
  const [showMenus, setShowMenus] = useState(false);
  const [showNotificationsBanner, setShowNotificationsBanner] = useState(false);
  const { setMode } = useContext(ToggleModeContext);
  const [isReadMore, setIsReadMore] = useState(
    window.screen.width <= 768 ? true : false
  );

  const commentRefs = useRef([]);

  const listItems = [
    {
      value: "Home",
      icon: (
        <UserSVG
          className={"w-[1.2rem] sm:w-[1.5rem] group-hover:!stroke-[color:var(--secondary-color)] stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)] stroke-[0.1px]"}
        />
      ),
      link: "/account",
    },
    {
      value: "Notifications",
      icon: (
        <Notifications
          className={"w-[1.2rem] sm:w-[1.5rem] group-hover:!stroke-[color:var(--secondary-color)] stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)] stroke-[0.1px]"}
        />
      ),
      link: "",
    },
    {
      value: "Logout",
      icon: (
        // <Messages
        //   className={"w-[1.2rem] sm:w-[1.5rem] group-hover:!stroke-[color:var(--secondary-color)] stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)] stroke-[0.1px]"}
        // />
        <i className="fa-solid fa-right-from-bracket text-lg md:text-xl group-hovertext-[color:var(--secondary-color)] text-[color:var(--primary-color)]"></i>
      ),
      link: "/",
    },
    {
      value: "My Properties",
      icon: (
        <Home
          className={"w-[1.2rem] sm:w-[1.5rem] group-hover:!stroke-[color:var(--secondary-color)] stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)] stroke-[0.1px]"}
        />
      ),
      link: "/my_properties",
    },
  ];

  const showMenusHandler = () => {
    setShowMenus(true);
  };
  const hideMenusHandler = () => {
    setShowMenus(false);
  };

  const onClickHandler = () => {
    setShowMenus((prev) => !prev);
  };

  const likeClickHandler = (commentId) => {
    dispatch(likeComment({ user: userId, comment: commentId }, {}))
  }

  const notificationClickHandler = () => {
    setShowNotificationsBanner(prev => !prev);
    dispatch(updateNotificationStatus({ id: userId }, {}))
  }

  function scrollToComment(index) {
    const commentRef = commentRefs.current[index];
    commentRef.scrollIntoView({ behavior: "smooth" });
  }

  const ReadMore = ({ children, length }) => {
    const text = children;
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="my-2 md:my-4 lg:my-5 font-light leading-8 sm:pr-8 md:pr-12 lg:pr-16">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="font-semibold text-sm">
          {isReadMore && text.length > 150 ? "...read more" : text.length > 150 ? " show less" : ""}
        </span>
      </p>
    );
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    // const imageBlob = new Blob([User.Image], { type: 'image/jpeg' });
    // const imageFile = new File([imageBlob], User.Image, { type: 'image/jpeg' });
    // const userName = User.Email.split('@')[0];
    // const formData = new FormData();

    // formData.append('Name', User.Name);
    // formData.append('UserName', userName);
    // formData.append('Time', new Date().toLocaleString());
    // formData.append('Description', comment);
    // formData.append('user', imageFile, User.Image);
    // formData.append('Image', imageFile, User.Image);

    dispatch(addComment({
      Time: new Date().toLocaleString(),
      Description: comment,
      UserId: sessionStorage.getItem('userId'),
    }, {}));
    setComment('');
  }


  const replySubmitHandler = (e, commentId) => {
    e.preventDefault();
    dispatch(addReply({ Description: replyMessage, parentComment: commentId, user: userId }, {}))
    setReplyMessage('');
  }

  useEffect(() => {
    if (sessionStorage.getItem('userId')) {
      if (isPro) {
        setMode('light');
      }
      dispatch(getBlogs());
      dispatch(getComments());
      dispatch(getNotificationsByUserId(userId))
    } else {
      navigate('/register')
    }
  }, [])

  console.log(notifications);

  return (
    <Fragment>
      <div className="bg-white dark:bg-[#212121]">
        <div className="flex justify-between w-full sm:w-11/12 md:w-10/12 mx-auto pb-8 px-4 sm:px-0">
          {/* Dropdown */}
          <div
            className="relative peer"
            onMouseEnter={() => showMenusHandler()}
            onMouseLeave={() => { hideMenusHandler(); setShowNotificationsBanner(false) }}

          // onClick={onClickHandler}
          >
            <span className="py-4 font-semibold md:text-lg lg:text-xl 2xl:text-3xl text-black dark:text-white border-b-4 border-[color:var(--orange)] dark:border-[color:var(--yellow)] cursor-pointer"
              onClick={onClickHandler}
            >
              For You
            </span>
            {showMenus && (
              <div className="absolute -left-0 top-10 md:top-12 w-full h-full z-20">
                <ul className="absolute -left-4 top-2 md:top-4 w-fit flex flex-col gap-4 md:gap-8 py-6 lg:py-10 border-[3px] border-[color:var(--orange)] dark:border-[color:var(--yellow)] bg-white dark:bg-[#212121] rounded-md text-black dark:text-white z-10">
                  {listItems.map((item, index) => {
                    let isUnread = (notifications.some(obj => 'status' in obj && obj.status === 'unread'));
                    return (
                      <li className="relative cursor-pointer group px-6 lg:px-10" key={index}
                        onClick={index === 1 ? notificationClickHandler : index === 2 ? () => { sessionStorage.removeItem('userId'); sessionStorage.removeItem('isPro') } : undefined}
                      >
                        <Link to={item.link} className="relative flex items-center gap-6">

                          {/* Ping icon for notifications */}
                          {isUnread && index === 1 && <span className="absolute -left-4 lg:-left-6 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex w-3 h-3 rounded-full bg-[color:var(--primary-color)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[color:var(--secondary-color)]"></span>
                          </span>
                          }
                          {item.icon}
                          <span className="text-base md:text-lg lg:text-2xl text-black dark:text-white group-hover:!text-[color:var(--secondary-color)]"
                          >
                            {item.value}
                          </span>
                        </Link>
                        {/* Notifications Banner */}
                        {showNotificationsBanner && index === 1 &&
                          <ul className="flex flex-col gap-2 absolute left-20 top-7 sm:top-8 md:top-9 lg:top-11 py-3 w-56 sm:w-64 h-[21.3rem] notification overflow-y-scroll bg-white dark:bg-[#212121] z-30 rounded-md border-2 border-t-4 border-[color:var(--secondary-color)] dark:border-[color:var(--primary-color)]">
                            {notifications.map((notification, index) => (
                              <li className="flex gap-2 relative px-2" key={index} ref={el => commentRefs.current[index] = el} onClick={() => scrollToComment(index)}>
                                <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${notification.author?.Image && notification.author?.Image}`} className="h-11 w-11 rounded-full block" />
                                <div>
                                  <p className="text-sm sm:text-base text-[color:var(--primary-color)] dark:text-[color:var(--secondary-color)]">{notification.author.Name} {notification.type == "like" ? 'liked' : 'replied to'} your comment</p>
                                  <p className="text-sm sm:text-base text-black dark:text-white">
                                    {notification.type === "reply" ? `${notification?.reply?.Description.slice(0, 48)} ${notification?.reply?.Description?.length > 48 ? '...' : ""}` :
                                      `${notification?.comment?.Description.slice(0, 48)} ${notification?.comment?.Description?.length > 48 ? '...' : ""}`
                                    }
                                  </p>
                                  <p className="text-sm text-[color:var(--dark-gray)] dark:text-[color:var(--gray)]">
                                    {new Date(notification.Date).toDateString()}
                                  </p>
                                </div>
                              </li>

                            ))}
                          </ul>
                        }
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
          <span className="md:text-lg lg:text-xl 2xl:text-3xl text-center font-[400] text-[color:var(--orange)] dark:text-[color:var(--yellow)] w-56 sm:w-fit">
            Your Timeline, curated. Find all the latest updates here.
          </span>
        </div>
        <div className="relative w-full">
          {!loading ? <img src={`${process.env.REACT_APP_ATLAS_URL}/file/${blogData[0]?.Image}`} alt="blog" className="h-[20rem] sm:h-[29rem] md:h-[40rem] lg:h-[65rem] w-full opacity-70" />
            :
            <div className="animate-pulse h-[20rem] sm:h-[29rem] md:h-[40rem] lg:h-[65rem] bg-gray-300" />
          }

          <div className="absolute flex flex-col gap-4 left-1/2 lg:left-20 bottom-1/2 lg:bottom-8 translate-y-1/2 lg:translate-y-0 -translate-x-1/2 lg:translate-x-0 text-white">
            <span className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold">
              {/* How the World Cup affects */}
              {blogData[0]?.Title}
            </span>
            <span className="text-xl md:text-3xl lg:text-5xl font-light">
              Real Estate prices.
            </span>
            <span
              className="md:text-xl lg:text-2xl text-center sm:text-left font-light text-[color:var(--orange)] sm:border-b-2 border-[color:var(--orange)] w-fit cursor-pointer"
              onClick={() => navigate('/blog', { state: blogData[0] })}
            >
              Click here to view full article
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-11/12 md:w-10/12 lg:w-3/4 mx-auto mt-12">
          <form className="flex flex-col gap-6 justify-center items-center  mt-4 border-b-2 border-[color:var(--orange)] pb-4" onSubmit={commentSubmitHandler}>

            <textarea rows={5} className="p-2 w-full sm:w-10/12 md:w-3/4 lg:w-2/3 2xl:w-1/2 text-[1.07rem] bg-transparent border-2 border-[color:var(--secondary-color)] outline-none rounded-md" placeholder="Post a comment"
              value={comment} onChange={(e) => setComment(e.target.value)} />
            <button
              type="submit"
              id="registerBtn"
              className="px-2 self-end text-[1.01rem] bg-[color:var(--primary-color)] text-white py-[0.38rem] hover:text-[color:var(--secondary-color)] outline-none rounded-md font-open-sans"
            >
              Submit
            </button>
          </form>
          <ul className="flex flex-col gap-8 sm:gap-8 mx-auto">
            {commentData.map((comment, index) => {
              const commentDate = new Date(comment.Time);
              const currentDate = new Date();

              const timeDiff = currentDate - commentDate;
              const secondsDiff = Math.floor(timeDiff / 1000);
              const minutesDiff = Math.floor(secondsDiff / 60);
              const hoursDiff = Math.floor(minutesDiff / 60);
              const daysDiff = Math.floor(hoursDiff / 24);
              const weeksDiff = Math.floor(daysDiff / 7);
              const yearsDiff = Math.floor(daysDiff / 365);

              let timeAgo;
              if (yearsDiff > 0) {
                timeAgo = `${yearsDiff}y${yearsDiff === 1 ? '' : 's'}`;
              } else if (weeksDiff > 0) {
                timeAgo = `${weeksDiff}w${weeksDiff === 1 ? '' : 's'}`;
              } else if (daysDiff > 0) {
                timeAgo = `${daysDiff}d${daysDiff === 1 ? '' : 's'}`;
              } else if (hoursDiff > 0) {
                timeAgo = `${hoursDiff}h${hoursDiff === 1 ? '' : 's'}`;
              } else if (minutesDiff > 0) {
                timeAgo = `${minutesDiff}m${minutesDiff === 1 ? '' : 's'}`;
              } else {
                timeAgo = 'just now';
              }
              return (
                <li
                  className={`flex gap-4 sm:gap-6 ${index !== commentData.length - 1 && "border-b-2"
                    } border-[color:var(--orange)]`}
                  ref={el => commentRefs.current[index] = el}
                  key={index}
                >
                  <img
                    src={comment?.user?.Image ? `${process.env.REACT_APP_ATLAS_URL}/file/${comment.user.Image}` : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                    alt="profile"
                    className="block w-[50px] sm:w-[84px] h-[50px] sm:h-[84px] rounded-full"
                  />
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl md:text-3xl text-[color:var(--yellow)] font-light">
                        {comment?.user?.Name}
                      </span>
                      <span className="sm:text-lg md:text-2xl text-[color:var(--orange)]">
                        {comment?.user?.Email?.split('@')[0]}
                      </span>
                      <span className="sm:text-lg md:text-2xl text-[color:var(--dark-gray)] dark:text-[color:var(--gray)]">
                        {/* {new Date(new Date() - new Date(comment.Time).getTime()).getHours() < 24 ? `${new Date(new Date() - new Date(comment.Time).getTime()).getHours()}h` : new Date(commentData[0].Time).toLocaleString().split(',')[0].split('/').reverse().join('-')} */}
                        {/* {new Date(comment.Time).toLocaleString().split(',')[0]} */}
                        {timeAgo}

                      </span>
                    </div>
                    <span className="sm:text-lg md:text-2xl font-light text-black dark:text-white">
                      {comment.Description}
                    </span>
                    <div className="flex items-center justify-center gap-6 sm:gap-16 md:gap-24 lg:gap-32 mt-5 mb-10 text-2xl text-[color:var(--orange)] dark:text-[color:var(--yellow)] w-full">
                      <div onClick={() => setActiveReplyIndex(prev => prev === index ? null : index)} className="cursor-pointer">
                        <Comment
                          className={"w-[1.2rem] sm:w-[1.5rem] stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)]"}
                        />
                      </div>
                      <Retweet
                        className={"w-[1.2rem] sm:w-[1.5rem] stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)] cursor-pointer"}
                      />
                      {/* Like */}
                      <div className={`flex items-center gap-1 ${comment.Likes && comment.Likes.includes(userId) ? 'text-[color:var(--primary-color)] dark:text-[color:var(--secondary-color)]' : 'text-[color:var(--secondary-color)] dark:text-[color:var(--primary-color)]'}`}>
                        <span className="-translate-y-[0.1rem] text-[1.2rem] sm:text-2xl">{comment?.Likes?.length > 0 && comment?.Likes?.length}</span>
                        <i className={`${comment.Likes && comment.Likes.includes(userId) ? 'fa' : 'far'} fa fa-heart text-[1.4rem] sm:text-3xl lg:text-3xl cursor-pointer`} onClick={() => likeClickHandler(comment._id)}></i>
                      </div>
                      <Share
                        className={"w-[1.2rem] sm:w-[1.5rem] stroke-[color:var(--secondary-color)] dark:stroke-[color:var(--primary-color)] cursor-pointer"}
                      />
                    </div>
                    <ul className="flex flex-col gap-2 mb-2 w-full">
                      {comment.replies && comment.replies.map((reply, index) => {
                        const replyDate = new Date(reply.Date);
                        const currentDate = new Date();

                        const timeDiff = currentDate - replyDate;
                        const secondsDiff = Math.floor(timeDiff / 1000);
                        const minutesDiff = Math.floor(secondsDiff / 60);
                        const hoursDiff = Math.floor(minutesDiff / 60);
                        const daysDiff = Math.floor(hoursDiff / 24);
                        const weeksDiff = Math.floor(daysDiff / 7);
                        const yearsDiff = Math.floor(daysDiff / 365);

                        let timeAgo;
                        if (yearsDiff > 0) {
                          timeAgo = `${yearsDiff}y${yearsDiff === 1 ? '' : 's'}`;
                        } else if (weeksDiff > 0) {
                          timeAgo = `${weeksDiff}w${weeksDiff === 1 ? '' : 's'}`;
                        } else if (daysDiff > 0) {
                          timeAgo = `${daysDiff}d${daysDiff === 1 ? '' : 's'}`;
                        } else if (hoursDiff > 0) {
                          timeAgo = `${hoursDiff}h${hoursDiff === 1 ? '' : 's'}`;
                        } else if (minutesDiff > 0) {
                          timeAgo = `${minutesDiff}m${minutesDiff === 1 ? '' : 's'}`;
                        } else {
                          timeAgo = 'just now';
                        }
                        return (
                          <li className="flex flex-col gap-1 mb-4 border-l-2 pl-4 border-[color:var(--dark-gray)] dark:border-[color:var(--gray)]" key={index}>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className="text-base sm:text-xl md:text-2xl text-[color:var(--yellow)] font-light">
                                {comment._ReplyUser[index]?.Name}
                              </span>
                              <span className="sm:text-lg md:text-2xl text-[color:var(--orange)]">
                                {comment._ReplyUser[index]?.Email?.split('@')[0]}
                              </span>
                              <span className=" md:text-xl text-[color:var(--dark-gray)] dark:text-[color:var(--gray)]">
                                {timeAgo}
                              </span>
                            </div>
                            <span className="sm:text-lg md:text-xl font-light text-black dark:text-white">
                              <ReadMore>{reply.Description}</ReadMore>
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                    {activeReplyIndex === index && <form className="flex flex-col gap-3 mb-4" onSubmit={(e) => replySubmitHandler(e, comment._id)}>
                      <textarea rows={5} className="p-2 w-full text-[1.07rem] bg-transparent border-2 border-[color:var(--secondary-color)] outline-none rounded-sm"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Write your reply..."
                      />
                      <button
                        type="submit"
                        id="registerBtn"
                        className="px-2 self-end text-[1.01rem] bg-[color:var(--primary-color)] text-white py-[0.38rem] hover:text-[color:var(--secondary-color)] outline-none rounded-md font-open-sans"
                      >
                        Reply
                      </button>
                    </form>
                    }
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Account;

