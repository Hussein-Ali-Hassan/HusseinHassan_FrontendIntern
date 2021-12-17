import useFormContext from "@/context/FormContext";

export default function SingleChoice({ questionIndex, options }) {
  const { handleQuestionDataChange } = useFormContext();

  const handleDataChange = (event) => {
    const tempOptions = [...options];
    tempOptions[event.target.dataset.id][event.target.name] =
      event.target.value;

    handleQuestionDataChange(questionIndex, tempOptions);
  };

  const addNewOption = () => {
    const newOptions = [...options, { name: "", price: 0 }];
    handleQuestionDataChange(questionIndex, newOptions);
  };

  const deleteOption = (index) => {
    const newOptions = options.filter((_, idx) => idx !== index);
    handleQuestionDataChange(questionIndex, newOptions);
  };

  return (
    <div className="table">
      <div className="table-title">Food costs</div>
      <div className="table-content">
        <div className="table-header">
          <div className="table-row">
            <div className="table-data">
              <div>Item</div>
            </div>
            <div className="table-data">
              <div>Price</div>
            </div>
          </div>
        </div>
        <div className="table-body">
          {options.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">
                <input
                  name="name"
                  data-id={index}
                  type="text"
                  value={item.name}
                  onChange={handleDataChange}
                />
              </div>
              <div className="table-data">
                <input
                  name="price"
                  data-id={index}
                  type="number"
                  value={item.price}
                  onChange={handleDataChange}
                />
              </div>
              <div className="table-data">
                <button onClick={() => deleteOption(index)}>-</button>
              </div>
            </div>
          ))}
          <div className="table-row">
            <div className="table-data">
              <button onClick={addNewOption}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
