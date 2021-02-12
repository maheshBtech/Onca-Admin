import { EditorState } from 'draft-js';

let today = new Date();
let formatedDate = today.toISOString().slice(0, 10)

export let EventObject = {
    requestId: null,
    templateId: null,
    EventInformation: {
        EventFree: 0,
        EventPaid: 1,
        EventName: '',
        EventType: 0,
        EventDescription: EditorState.createEmpty(),
        EventFromDate: formatedDate,
        EventToDate: formatedDate,
        EventStartTime: '',
        EventEndTime:'',
        EventImgUpload:[],
        AIValidationStatus: false,
    },
    EventConnectivity: {
        EventModeLive: true,
        EventModeOnline: false,
        EventModeOnGround: false,
        EventECertificate: false,
        EventECertificateTemplate: 0,
        EventRegistrationTemplate: 0,
        EventRegSuccessMailTemplate: 0,
        EventRegFailMailTemplate: 0,
        ACValidationStatus: false
    },
    EventPricing: { 
        Price: 0, 
        Tax: 0, 
        TrainingLocationID: 0,
        APValidationStatus: false 
    },
    EventVisibility: {
        EventCountry: 0,
        EventState: 0,
        EventCity: 0,
        EventTrainingLocation: "",
        EventParticipentLimit: null,
        EventWebsite: true,
        EventMobile: true,
        EventVenuDetail: EditorState.createEmpty(),
        AVValidationStatus: false
    },
    OverAllValidationStatus: false
}

export let AllDlls = {
    EventTypeList:[], 
    WeekDayList:[], 
    GroupList:[], 
    TaxList:[], 
    TrainingLocationList:[], 
    CountryList:[], 
    StateList:[], 
    CityList:[], 
    UserList:[], 
    EventTemplList: [],
    GroupSetGroupMap: []
}

export let AllValidate = {
    AIValidate:{
       EventNameAIV:'',
       EventTypeAIV:'',
       // EventTagAIV:'',
       EventDescriptionAIV:'',
       EventFromDateAIV:'',
       EventToDateAIV:'',
       EventStartTimeAIV:'',
       EventEndTimeAIV:'',
       EventWeekDaysAIV: '',
       EventAddDescAIV: ''
    },
    APValidate:{
        EventPriceAPV: '',
        EventTaxAPV: ''
    },
    AVValidate:{
        EventCountryAVV: '',
        EventStateAVV: '',
        EventCityAVV: '',
        EventVenueAVV: '',
        EventVenueDetailAVV: ''
    }
}

