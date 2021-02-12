
let ActivityModel = {
    //property
    activityID : "",
    activityTypeId: "",
    activityName:"",
    activityShortDescription: "",
    activityFullDescription: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    price: "",
    discount: "",
    rating: "",
    stock: "",
    salescount: "",
    imagePath: "",
    categoryID: "",
    categoryName:"",
    newActivityFlag: "",
    activityTypeName: "",
};

const ActivityModalValue = () => {

    Object.defineProperties(ActivityModel,'ActivityID',{
        get() {
            return this.activityID;
        },
        set(value){
            this.activityID = value;
        }
    });

    Object.defineProperties(ActivityModel,'ActivityTypeId',{
        get() {
            return this.activityTypeId;
        },
        set(value){
            this.activityTypeId = value;
        }
    });

    Object.defineProperties(ActivityModel,'ActivityName',{
        get() {
            return this.activityName;
        },
        set(value){
            this.activityName = value;
        }
    });

    Object.defineProperties(ActivityModel,'ActivityShortDescription',{
        get() {
            return this.activityShortDescription;
        },
        set(value){
            this.activityShortDescription = value;
        }
    });

    Object.defineProperties(ActivityModel,'ActivityFullDescription',{
        get() {
            return this.activityFullDescription;
        },
        set(value){
            this.activityFullDescription = value;
        }
    });

    Object.defineProperties(ActivityModel,'StartDate',{
        get() {
            return this.startDate;
        },
        set(value){
            this.startDate = value;
        }
    });

    Object.defineProperties(ActivityModel,'EndDate',{
        get() {
            return this.endDate;
        },
        set(value){
            this.endDate = value;
        }
    });

    Object.defineProperties(ActivityModel,'StartTime',{
        get() {
            return this.startTime;
        },
        set(value){
            this.startTime = value;
        }
    });

    Object.defineProperties(ActivityModel,'EndTime',{
        get() {
            return this.endTime;
        },
        set(value){
            this.endTime = value;
        }
    });

    Object.defineProperties(ActivityModel,'Price',{
        get() {
            return this.price;
        },
        set(value){
            this.price = value;
        }
    });

    Object.defineProperties(ActivityModel,'Discount',{
        get() {
            return this.discount;
        },
        set(value){
            this.discount = value;
        }
    });

    Object.defineProperties(ActivityModel,'Rating',{
        get() {
            return this.rating;
        },
        set(value){
            this.rating = value;
        }
    });

    Object.defineProperties(ActivityModel,'Stock',{
        get() {
            return this.stock;
        },
        set(value){
            this.stock = value;
        }
    });

    Object.defineProperties(ActivityModel,'SalesCount',{
        get() {
            return this.salescount;
        },
        set(value){
            this.salescount = value;
        }
    });
    Object.defineProperties(ActivityModel,'ImagePath',{
        get() {
            return this.imagePath;
        },
        set(value){
            this.imagePath = value;
        }
    });
    Object.defineProperties(ActivityModel,'CategoryID',{
        get() {
            return this.categoryID;
        },
        set(value){
            this.categoryID = value;
        }
    });
    Object.defineProperties(ActivityModel,'CategoryName',{
        get() {
            return this.categoryName;
        },
        set(value){
            this.categoryName = value;
        }
    });
    Object.defineProperties(ActivityModel,'NewActivityFlag',{
        get() {
            return this.newActivityFlag;
        },
        set(value){
            this.newActivityFlag = value;
        }
    });
    Object.defineProperties(ActivityModel,'ActivityTypeName',{
        get() {
            return this.activityTypeName;
        },
        set(value){
            this.activityTypeName = value;
        }
    });
}

module.exports = ActivityModalValue;