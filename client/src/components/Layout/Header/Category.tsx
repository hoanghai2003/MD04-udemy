import Tippy from "@tippyjs/react/headless";

function Category() {
  return (
    <>
      <Tippy
        interactive
        // visible={true}
        placement="bottom-end"
        render={(attrs) => (
          <div className="box" tabIndex={-1} {...attrs}>
            <div className="list-category">
              <ul>
                {/*  */}
                <li className="dpl-fl">
                  <a href="">
                    <div>Development</div>
                    <div>
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </li>
                {/*  */}
                <li className="dpl-fl">
                  <a href="">
                    <div>Development</div>
                    <div>
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </li>
                {/*  */}
                <li className="dpl-fl">
                  <a href="">
                    <div>Development</div>
                    <div>
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </li>
                {/*  */}
                <li className="dpl-fl">
                  <a href="">
                    <div>Development</div>
                    <div>
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </li>
                {/*  */}
                <li className="dpl-fl">
                  <a href="">
                    <div>Development</div>
                    <div>
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      >
        <nav className="category">
          <button className="btn-category">
            <span>Categories</span>
          </button>
        </nav>
      </Tippy>
    </>
  );
}

export default Category;
