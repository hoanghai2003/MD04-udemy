function SvgIcon({ icon, size, style = {}, className, onClick }) {
  return (
    <i
      className={className}
      style={{ lineHeight: 0, fontSize: size, ...style }}
      onClick={onClick}
    >
      {icon}
    </i>
  );
}

export default SvgIcon;
