import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Avatar, Tabs, List, Tag, Spin, Alert } from "antd";
import {
  UserOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Comments, Post, User } from "../types";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const UserDetail = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comments>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Normalmente l'URL sarebbe costruito in modo più diverso
        const userDetailsUrl = `https://gorest.co.in/public/v2/users/${userId}`;
        const userPostsUrl = `https://gorest.co.in/public/v2/users/${userId}/posts`;
        const [userData, postsData] = await Promise.all([
          fetch(userDetailsUrl).then((res) => res.json()),
          fetch(userPostsUrl).then((res) => res.json()),
        ]);

        setUser(userData);
        setPosts(postsData);

        const commentsPromises = postsData.map((post: Post) =>
          fetch(
            `https://gorest.co.in/public/v2/posts/${post.id}/comments`
          ).then((res) => (res.ok ? res.json() : []))
        );

        const commentsData = await Promise.all(commentsPromises);
        const commentsObj: Comments = {};
        postsData.forEach((post: Post, index: number) => {
          commentsObj[post.id] = commentsData[index];
        });

        setComments(commentsObj);
      } catch (err) {
        setError("Failed to load user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert
          message={t("userDetail.errorTitle")}
          description={t("userDetail.errorDescription")}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert
          message={t("userDetail.userNotFound")}
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Card className="mb-8 ">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            className={user.gender === "male" ? "bg-blue-400" : "bg-pink-400"}
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="flex items-center gap-2">
              <MailOutlined /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              {t("userDetail.gender")}:{" "}
              <span
                className={
                  user.gender === "male" ? "text-blue-500" : "text-pink-500"
                }
              >
                {user.gender}
              </span>
            </p>
            <Tag
              color={user.status === "active" ? "green" : "red"}
              className="mt-2"
            >
              {user.status === "active" ? (
                <CheckCircleOutlined className="mr-1" />
              ) : (
                <CloseCircleOutlined className="mr-1" />
              )}
              {t("userDetail.status")}: {user.status.toUpperCase()}
            </Tag>
          </div>
        </div>
      </Card>
      <div className="mt-4">
        <Tabs defaultActiveKey="1" className="p-4 rounded shadow-sm">
          <TabPane
            tab={
              <span>
                <FileTextOutlined /> {t("userDetail.posts")} ({posts.length})
              </span>
            }
            key="1"
          >
            <div className="p-4">
              <List
                itemLayout="vertical"
                dataSource={posts}
                renderItem={(post) => (
                  <List.Item
                    key={post.id}
                    extra={
                      <Tag color="blue">
                        <CommentOutlined /> {comments[post.id]?.length || 0}{" "}
                        {t("userDetail.comments")}
                      </Tag>
                    }
                  >
                    <List.Item.Meta
                      title={
                        <h3 className="text-lg font-medium">{post.title}</h3>
                      }
                    />
                    <div className="mt-2">{post.body}</div>

                    {comments[post.id] && comments[post.id].length > 0 && (
                      <div className="mt-4 pl-4 border-l-1 border-gray-200">
                        <h4 className="text-md font-medium mb-2">
                          {t("userDetail.comments")}
                        </h4>
                        <List
                          itemLayout="horizontal"
                          dataSource={comments[post.id]}
                          renderItem={(comment) => (
                            <List.Item key={comment.id}>
                              <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={
                                  <span>
                                    {comment.name}{" "}
                                    <small className="text-gray-500">
                                      ({comment.email})
                                    </small>
                                  </span>
                                }
                                description={comment.body}
                              />
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                  </List.Item>
                )}
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <CommentOutlined /> {t("userDetail.todos")}
              </span>
            }
            disabled
            key="2"
          ></TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDetail;
