import { EditorState } from 'draft-js';

let today = new Date();
let formatedDate = today.toISOString().slice(0, 10)

export let ActivityObject = {
    requestId: null,
    templateId: null,
    ActivityInformation: {
        activityName: '',
        activityType: 0,
        activityTag: [],
        activityAssignGroup:'',
        activityDescription: EditorState.createEmpty(),
        activityAdditionalDescription: EditorState.createEmpty(),
        activityFromDate: formatedDate,
        activityToDate: formatedDate,
        activityStartTime: '',
        activityEndTime:'',
        activityWeekDays: [],
        activityImgUpload:[],
        AIValidationStatus: false,
    },
    ActivityConnectivity: {
        activityChat: false,
        activityGroupChat: true,
        activityModeLive: true,
        activityModeOnline: false,
        activityModeOnGround: false,
        activityECertificate: false,
        activityECertificateTemplate: 0,
        activityRegistrationTemplate: 0,
        activityRegSuccessMailTemplate: 0,
        activityRegFailMailTemplate: 0,
        ACValidationStatus: false
    },
    ActivityPricing: [{id: 1, Price:'', TaxID: '', TrainingLocationID:'', Discount: '0'}],
    ActivityVisibility: {
        activityVisibility: true,
        activityCountry: 0,
        activityState: 0,
        activityCity: 0,
        activityTrainingLocation: [],
        activityParticipentLimit: null,
        activityWebsite: true,
        activityMobile: true,
        activitySelectedUser: false,
        activitySelectedUserList: [],
        AVValidationStatus: false
    },
    ActivityEmailTemplate: {
        activityStartMailSub: '',
        activityStartMailDesc: EditorState.createEmpty(),
        activityAutoMailOnStart: true,
        activityEndMailSub: '',
        activityEndMailDesc: EditorState.createEmpty(),
        activityAutoMailOnEnd: false,
        AETValidationStatus: false
    },
    ActivitySMSTemplate: {
        activityStartMessage: '',
        activityEndMessage: '',
        ASMSTValidation: false
    },
    ActivityArchive: false,
    ActivityAutoArchive: true,
    ActivityTemplateName: '',
    OverAllValidationStatus: false
}

export let AllDlls = {
    ActivityTypeList:[], 
    WeekDayList:[], 
    GroupList:[], 
    TaxList:[], 
    TrainingLocationList:[], 
    CountryList:[], 
    StateList:[], 
    CityList:[], 
    UserList:[], 
    ActivityTemplList: [],
    GroupSetGroupMap: []
}

export let AllValidate = {
    AIValidate:{
       activityNameAIV:'',
       activityTypeAIV:'',
       activityTagAIV:'',
       activityDescriptionAIV:'',
       activityFromDateAIV:'',
       activityToDateAIV:'',
       activityStartTimeAIV:'',
       activityEndTimeAIV:'',
       activityWeekDaysAIV: '',
       activityAddDescAIV: ''
    },
    APValidate:{
        PriceTexAPV: '',
    },
    AEValidate:{
        activityStartMailSubAEV: '',
        activityStartMailDescAEV: '',
        activityEndMailSubAEV: '',
        activityEndMailDescAEV: '',
    }
}

