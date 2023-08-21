import { ChangeEvent, FC, useState } from "react";
import { useCreateProductMutation } from "../../services/productsApi";

export const CreateProduct: FC = () => {
  const [images, setImages] = useState<[string]>([]);
  const [imageUrls, setImageUrls] = useState<[string]>([]);

  const [info, setInfo] = useState<object>({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const [createProduct, { isLoading, isError, error, isSuccess }] =
    useCreateProductMutation();

  // const updateAvatar = (e: React.ChangeEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   const image: FileList = target.files as FileList;

  //   setImages([]);
  //   setImageUrls([]);

  //   for (let i = 0; i < image.length; i++) {
  //     if (image[i]) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setImageUrls((prevUrls) => {
  //           prevUrls.push(reader.result);
  //           return prevUrls;
  //         });
  //         setImages((prevImgs) => {
  //           prevImgs.push(URL.createObjectURL(image[i]));
  //           return prevImgs;
  //         });
  //       };
  //       reader.readAsDataURL(image[i]);
  //     }
  //   }
  // };

  const updateAvatar = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const image: File = (target.files as FileList)[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          prevImages.push(URL.createObjectURL(image));
          return prevImages;
        });
        setImageUrls((prevUrls) => {
          prevUrls.push(reader.result);
          return prevUrls;
        });
      };
      reader.readAsDataURL(image);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInfo((prevInfo) => ({ ...prevInfo, [target.name]: target.value }));
  };

  const submitProduct = () => {
    console.log("info", info);

    const product = { ...info, images: imageUrls };
    console.log("product", product);

    createProduct(product);
  };

  console.log(error);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={changeHandler}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        onChange={changeHandler}
      />
      <input
        type="text"
        placeholder="Category"
        name="category"
        onChange={changeHandler}
      />
      <input
        type="number"
        placeholder="Stock"
        name="stock"
        onChange={changeHandler}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={changeHandler}
      />
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/webp"
        onChange={updateAvatar}
        name="images"
      />
      <div className="flex flex-wrap">
        {images.map((imgURL, i) => {
          return (
            <img key={i} src={imgURL} alt="product photo" className="w-20" />
          );
        })}
      </div>

      {isLoading && <p className="text-xl font-extrabold">Loading...</p>}
      {isSuccess && (
        <p className="text-xl font-extrabold text-green-700">SUCCESS</p>
      )}
      {/* {isError && <p className="text-xl font-extrabold">{error}</p>} */}

      <button className="m-3 bg-accent p-2" onClick={submitProduct}>
        submit
      </button>
    </div>
  );
};
