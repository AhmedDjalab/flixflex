interface IAvatarProps {
  email: string;
}
const Avatar = ({ email: userName }: IAvatarProps) => {
  return (
    <span className="text-white ">{userName.split("@")[0].toUpperCase()}</span>
  );
};

export default Avatar;
