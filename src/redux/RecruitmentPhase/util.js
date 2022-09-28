import moment from 'moment'

export const dataDummy = {
  ActivityPriority: {
    activity1: 'Kegiatan mengerjakan sesuatu dengan tangan atau alat-alat mekanis secara terampil, seperti kegiatan yang memanfaatkan keterampilan tangan (menjahit, menenun, membuat kue, dll.), bidang mekanik, pertanian, listrik, serta teknik',
    activity2: 'Kegiatan yang melibatkan pengamatan terhadap gejalan fisik, biologis, serta budaya, seperti penelitian dan segala hal yang berbau ilmiah',
    activity3: 'Kegiatan yang memanfaatkan kreativitas dan imajinasi untuk menciptakan bentuk atau produk seni, seperti pekerja seni (seniman)',
    activity4: 'Kegiatan menginformasikan, melatih, mengembangkan, menyembuhkan, atau mencerahkan orang lain, seperti membantu atau mengajar orang lain (melayani orang lain)',
    activity5: 'Kegiatan yang menuntut kemampuan untuk memepengaruhi orang lain dalam rangka mencapai tujuan organisasi atau mendapatkan manfaat ekonomis, seperti menjual atau',
    activity6: 'Kegiatan yang melibatkan pemanfaatan data yang konkret, teratur, dan sistematis, seperti pencatatan, perhitungan, sistem bisnis, serta klerikal',

    activity7: 'Coorporate Communication',
    activity8: 'Finance, Accounting, Tax',
    activity9: 'Human Capital (HC)',
    activity10: 'Information Technology (IT)',
    activity11: 'Audit & Risk Management',
    activity12: 'Legal',
    activity13: 'Logistic/Supply Chain',
    activity14: 'Marketing',
    activity15: 'Production & Engineering',
    activity16: 'Sales',
    activity17: 'Security & Task Force',
    activity18: 'Strategic Planning & Business Development',
    activity19: 'Data & Statistics',
  },
  JobPriority: {
    jobPriority1: "Coorporate Communication",
    jobPriority2: "Finance, Accounting, Tax",
    jobPriority3: "Human Capital (HC)",
    jobPriority4: "Information Technology (IT)",
    jobPriority5: "Audit & Risk Management",
    jobPriority6: "Legal",
    jobPriority7: "Logistic/Supply Chain",
    jobPriority8: "Marketing",
    jobPriority9: "Production & Engineering",
    jobPriority10: "Sales",
    jobPriority11: "Security & Task Force",
    jobPriority12: "Strategic Planning & Business Development",
    jobPriority13: "Data & Statistics",
    jobPriority14: ""
  }
}

export const CheckHobby = (data, Check) => {
  let find = data.find(x => x.HobbyName.includes(Check))
  return {
    HobbyId: find ? find.HobbyId : '',
    HobbyName: find ? find.HobbyName : Check,
    value: find ? true : false
  }
}

export const MappSosialActivity = (data, Check) => {
  let find = data.find(x => x.ActivityName.includes(Check))
  return {
    ActivityId: find ? find.ActivityId : '',
    ActivityName: find ? find.ActivityName : Check,
    value: find ? true : false
  }
}

export const MappSosialActivityOther = (data, isOther = true) => {
  if (isOther) {
    let other = data.find(x => x.ActivityOther != '')
    return {
      ActivityId: other ? other.ActivityId : '',
      ActivityName: other ? other.ActivityOther : '',
      value: other ? true : false
    }
  } else {
    let other = data.filter(x => x.ActivityOther != '')
    return other.length != 0 ? other[0].ActivityOther : ''
  }
}

export const MappFacility = (data, check) => {
  let find = data.find(x => x.FacilityName.includes(check))
  return {
    FacilityId: find ? find.FacilityId : '',
    FacilityName: find ? find.FacilityName : check,
    value: find ? true : false
  }
}

export const MappFacilityOther = (data, isOther = true) => {
  if (isOther) {
    let other = data.find(x => x.FacilityOther != '')
    return {
      FacilityId: other ? other.FacilityId : '',
      FacilityName: other ? other.FacilityOther : '',
      value: other ? true : false
    }
  } else {
    let other = data.filter(x => x.FacilityOther != '')
    return other.length != 0 ? other[0].FacilityOther : ''
  }
}


export const MappCity = (data, Check) => {
  let find = data.find(x => x.CityName.includes(Check))
  return {
    CityId: find ? find.CityId : '',
    CityName: find ? find.CityName : Check,
    value: find ? true : false
  }
}

export const MappActivityPriority = (data, Check) => {
  let find = data.find(x => x.ActivityText.includes(Check))
  return {
    ActivityId: find ? find.ActivityId : '',
    ActivityText: find ? find.ActivityText : Check,
    value: find ? true : false
  }
}

export const MapJobPriority = (data, Check) => {
  let find = data.find(x => x.JobPriorityText.includes(Check))
  return {
    JobPriorityId: find ? find.JobPriorityId : '',
    JobPriorityText: find ? find.JobPriorityText : Check,
    value: find ? true : false
  }
}
export const MapJobPriorityOther = (data, isOther = true) => {
  if (isOther) {
    let other = data.find(x => x.JobPriorityOther != '')
    return {
      JobPriorityId: other ? other.JobPriorityId : '',
      JobPriorityText: other ? other.JobPriorityOther : '',
      value: other ? true : false
    }
  } else {
    let other = data.filter(x => x.JobPriorityOther != '')
    return other.length != 0 ? other[0].JobPriorityOther : ''
  }
}

export const ReqHobby = (data) => {
  let hobby = []
  data.hobby1.value && hobby.push(data.hobby1)
  data.hobby2.value && hobby.push(data.hobby2)
  data.hobby3.value && hobby.push(data.hobby3)
  data.hobby4.value && hobby.push(data.hobby4)
  data.hobby5.value && hobby.push(data.hobby5)
  data.hobby6.value && hobby.push(data.hobby6)
  data.hobby7.value && hobby.push(data.hobby7)
  data.hobby8.value && hobby.push(data.hobby8)
  data.hobby9.value && hobby.push(data.hobby9)
  data.hobby10.value && hobby.push(data.hobby10)
  return hobby
}

export const ReqSosialActivity = (data) => {
  let SosialActivity = []
  data.socialActivity1.value && SosialActivity.push({ ...data.socialActivity1, ActivityOther: data.socialActivityOthers })
  data.socialActivity2.value && SosialActivity.push({ ...data.socialActivity2, ActivityOther: data.socialActivityOthers })
  data.socialActivity3.value && SosialActivity.push({ ...data.socialActivity3, ActivityOther: data.socialActivityOthers })
  data.socialActivity4.value && SosialActivity.push({ ...data.socialActivity4, ActivityOther: data.socialActivityOthers })
  data.socialActivity5.value && SosialActivity.push({ ...data.socialActivity5, ActivityOther: data.socialActivityOthers })
  data.socialActivity6.value && SosialActivity.push({ ...data.socialActivity6, ActivityOther: data.socialActivityOthers })
  data.socialActivity7.value && SosialActivity.push({ ...data.socialActivity7, ActivityOther: data.socialActivityOthers })
  data.socialActivity8.value && SosialActivity.push({ ...data.socialActivity8, ActivityOther: data.socialActivityOthers })
  data.socialActivity9.value && SosialActivity.push({ ...data.socialActivity9, ActivityOther: data.socialActivityOthers })
  data.socialActivity10.value && SosialActivity.push({ ...data.socialActivity10, ActivityOther: data.socialActivityOthers })
  return SosialActivity
}

export const ReqFacility = (data) => {
  let Facility = []
  data.facility1.value && Facility.push({ ...data.facility1, FacilityOther: data.facilityOthers })
  data.facility2.value && Facility.push({ ...data.facility2, FacilityOther: data.facilityOthers })
  data.facility3.value && Facility.push({ ...data.facility3, FacilityOther: data.facilityOthers })
  data.facility4.value && Facility.push({ ...data.facility4, FacilityOther: data.facilityOthers })
  data.facility5.value && Facility.push({ ...data.facility5, FacilityOther: data.facilityOthers })
  data.facility6.value && Facility.push({ ...data.facility6, FacilityOther: data.facilityOthers })
  data.facility7.value && Facility.push({ ...data.facility7, FacilityOther: data.facilityOthers })
  data.facility8.value && Facility.push({ ...data.facility8, FacilityOther: data.facilityOthers })
  data.facility9.value && Facility.push({ ...data.facility9, FacilityOther: data.facilityOthers })
  data.facility10.value && Facility.push({ ...data.facility10, FacilityOther: data.facilityOthers })
  data.facility11.value && Facility.push({ ...data.facility11, FacilityOther: data.facilityOthers })
  data.facility12.value && Facility.push({ ...data.facility12, FacilityOther: data.facilityOthers })
  data.facility13.value && Facility.push({ ...data.facility13, FacilityOther: data.facilityOthers })
  data.facility14.value && Facility.push({ ...data.facility14, FacilityOther: data.facilityOthers })
  data.facility15.value && Facility.push({ ...data.facility15, FacilityOther: data.facilityOthers })
  data.facility16.value && Facility.push({ ...data.facility16, FacilityOther: data.facilityOthers })
  data.facility17.value && Facility.push({ ...data.facility17, FacilityOther: data.facilityOthers })
  return Facility
}

export const ReqJobPriority = (data) => {
  let JobPriority = []
  let sequenceJobPriority = []
  data.jobPriority1.value && JobPriority.push({ ...data.jobPriority1, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority1, JobPriorityDummy: dataDummy.JobPriority.jobPriority1})
  data.jobPriority2.value && JobPriority.push({ ...data.jobPriority2, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority2, JobPriorityDummy: dataDummy.JobPriority.jobPriority2})
  data.jobPriority3.value && JobPriority.push({ ...data.jobPriority3, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority3, JobPriorityDummy: dataDummy.JobPriority.jobPriority3})
  data.jobPriority4.value && JobPriority.push({ ...data.jobPriority4, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority4, JobPriorityDummy: dataDummy.JobPriority.jobPriority4})
  data.jobPriority5.value && JobPriority.push({ ...data.jobPriority5, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority5, JobPriorityDummy: dataDummy.JobPriority.jobPriority5})
  data.jobPriority6.value && JobPriority.push({ ...data.jobPriority6, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority6, JobPriorityDummy: dataDummy.JobPriority.jobPriority6})
  data.jobPriority7.value && JobPriority.push({ ...data.jobPriority7, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority7, JobPriorityDummy: dataDummy.JobPriority.jobPriority7})
  data.jobPriority8.value && JobPriority.push({ ...data.jobPriority8, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority8, JobPriorityDummy: dataDummy.JobPriority.jobPriority8})
  data.jobPriority9.value && JobPriority.push({ ...data.jobPriority9, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority9, JobPriorityDummy: dataDummy.JobPriority.jobPriority9})
  data.jobPriority10.value && JobPriority.push({ ...data.jobPriority10, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority10, JobPriorityDummy: dataDummy.JobPriority.jobPriority10})
  data.jobPriority11.value && JobPriority.push({ ...data.jobPriority11, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority11, JobPriorityDummy: dataDummy.JobPriority.jobPriority11})
  data.jobPriority12.value && JobPriority.push({ ...data.jobPriority12, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority12, JobPriorityDummy: dataDummy.JobPriority.jobPriority12})
  data.jobPriority13.value && JobPriority.push({ ...data.jobPriority13, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: dataDummy.JobPriority.jobPriority13, JobPriorityDummy: dataDummy.JobPriority.jobPriority13})
  data.jobPriority14.value && JobPriority.push({ ...data.jobPriority14, JobPriorityOther: data.jobPriorityOthers, JobPriorityText: data.jobPriorityOthers, JobPriorityDummy: "Lainnya"})
  
  data.tableActivityPriorityJob.map(dataIdx => {
    JobPriority.some((obj, idx) => {
      if(dataIdx.JobPriorityText === obj.JobPriorityDummy){
        if(dataIdx.JobPriorityText === "Lainnya"){
          sequenceJobPriority.push({...dataIdx, JobPriorityId: dataIdx.JobPriorityId, JobPriorityText: "", JobPriorityOther: data.jobPriorityOthers})
        }else sequenceJobPriority.push({...dataIdx})
        return true
      }
    })
  })
  return sequenceJobPriority
}

export const ReqCity = (data) => {
  if (data.placementAvailibility === "Bersedia") {
    let City = []
    data.city1.value && City.push(data.city1)
    data.city2.value && City.push(data.city2)
    data.city3.value && City.push(data.city3)
    data.city4.value && City.push(data.city4)
    data.city5.value && City.push(data.city5)
    data.city6.value && City.push(data.city6)
    data.city7.value && City.push(data.city7)
    return City
  } else {
    return []
  }
}

export const MappingViewFLK = (response) => {
  return {
    applicantID: response.personalData.applicantID,
    photoUrl: response.personalData.profilePicUrl,
    Photo: response.personalData.photo,
    namaLengkap: response.personalData.fullName,
    tempatLahir: response.personalData.birthPlaceId,
    // tempatLahirOther: response.personalData.birthPlaceOther,
    tanggalLahir: response.personalData.birthDate !== null ? moment(response.personalData.birthDate, 'DD/MM/YYYY') : '',
    kewarganegaraan: response.personalData.nationalityName,
    kewarganegaraanOthers: response.personalData.NationalityOther,
    alamatLengkap: response.personalData.domicileAddress ? response.personalData.domicileAddress : response.personalData.domicileOther,
    noHP1: response.personalData.phone1,
    noHP2: response.personalData.phone2,
    telpRumahCode: response.personalData.addressPhone,
    telpRumah: response.personalData.addressPhone,
    email: response.personalData.email,
    gender: response.personalData.gender,
    workExperienceCategory: response.personalData.workExperienceCategory,

    tablePendidikan: response.Pendidikan.EducationList.map(x => ({
      EducationDetailsId: x.EducationDetailsId,
      Tingkat: x.Degree,
      TingkatId: x.DegreeId,
      NamaInstitution: x.InstituteUniversity,
      NamaInstitutionId: x.InstituteUniversityId,
      NamaInstitusiOthers: x.InstituteUniversityOther,
      Kota: x.CityName,
      KotaID: x.CityId,
      KotaOthers: x.CityOther,
      Jurusan: x.Major,
      JurusanID: x.MajorId,
      JurusanOthers: x.MajorOther,
      ProgramStudi: x.StudyProgram ? x.StudyProgram : "",
      TahunMasuk: x.StartYear,
      TahunLulus: x.GraduatedYear,
      GpaNem: x.GPA
    })),
    judulSkripsi: response.Pendidikan.SkripsiTitle,
    tautanSkripsi: response.Pendidikan.SkripsiLink,
    publikasi: response.Pendidikan.PublikasiType,
    judulPublikasi: response.Pendidikan.PublikasiTitle,
    tautanPublikasi: response.Pendidikan.PublikasiLink,

    tablePelatihan: response.Pendidikan.StudyProgramList.map(x => ({
      FLKNonFormalEducationId: x.FLKNonFormalEducationId,
      NamaProgram: x.TrainingName,
      Penyelenggara: x.TrainingOrganizer,
      Tahun: x.TrainingDate,
      Keterangan: x.TrainDesc
    })),
    tableOrganisasi: response.Pendidikan.OrganizationList.map(x => ({
      OrganizationalExperienceId: x.OrganizationalExperienceId,
      NamaOrganisasi: x.OrganizationName,
      Jabatan: x.OrganizationTitleName,
      JabatanId: x.OrganizationTitleId,
      Lingkup: x.OrganizationScopeName,
      LingkupId: x.OrganizationScopeId
    })),

    //page2 - fresh grad
    statusPernikahan: response.family.MartialStatus !== undefined ? response.family.MartialStatus !== null ? response.family.MartialStatus.toLowerCase() : 'lajang' : 'lajang',
    sejakTahun: response.family.MartialDate !== undefined ? response.family.MartialDate !== null ? moment(response.family.MartialDate, 'DD/MM/YYYY') : '' : '',
    anakKe: response.family.Anakke,
    jumlahSaudara: response.family.JumlahSaudara,
    namaAyah: response.family.FatherName,
    usiaAyah: response.family.FatherAge,
    pendidikanTerakhirAyah: response.family.FatherLastEducationId,
    pekerjaanAyah: response.family.FatherOccupationId,
    titleAyah: response.family.FatherFamilyTitleId,
    namaIbu: response.family.MotherName,
    usiaIbu: response.family.MotherAge,
    pendidikanTerakhirIbu: response.family.MotherLastEducationId,
    pekerjaanIbu: response.family.MotherOccupationId,
    titleIbu: response.family.MotherFamilyTitleId,
    tableFamily: response.family.FamilyStatusList.map(x => ({
      FLKFamilyStatusId: x.FLKFamilyStatusId,
      keluarga: x.FamilyStatusName,
      keluargaId: x.FamilyStatusId,
      usia: x.FamilyStatusAge,
      status: x.IsAlmh,
      pendidikanTerakhir: x.FamilyStatusLastEducation,
      pendidikanTerakhirId: x.FamilyStatusLastEducationId,
      pekerjaan: x.FamilyOccupation,
      pekerjaanId: x.FamilyOccupationId
      //x.FamilyTitleId
      //x.FamilyTitle
    })),

    tableMagang: response.pengalaman.internshipList.map(x => ({
      FLKInternShiptId: x.FLKInternshipId,
      InternInstitutionName: x.InternshipInstituteName,
      InternStartDate: x.InternshipStartDate,
      InternEndDate: x.InternshipEndDate,
      InternDesc: x.InternshipJobDesc
    })),
    tableJobExperience: response.pengalaman.experienceList.map(x => ({
      WorkExperienceId: x.WorkExperienceId,
      namaInstitusi: x.CompanyName,
      jabatan: x.TitleName,
      jabatanId: x.TitleId,
      posisi: x.Position,
      tipePosisi: x.PositionTypeName,
      tipePosisiId: x.PositionTypeId,
      descPekerjaan1: x.MainJob1,
      descPekerjaan2: x.MainJob2,
      descPekerjaan3: x.MainJob3,
      jobDescFullName: 
        x.MainJob2 ? 
          x.MainJob3 ? 
            x.MainJob1.concat(', ', x.MainJob2, ', ', x.MainJob3) 
          : x.MainJob1.concat(', ', x.MainJob2) 
        : x.MainJob1,
      improvement: x.Improvement ? x.Improvement : "",
      bidangKerja1: x.Function,
      bidangKerja1Id: x.FunctionId1,
      bidangKerja2: x.Function2Name,
      bidangKerja2Id: x.FunctionId2,
      bidangKerja3: x.Function3Name,
      bidangKerja3Id: x.FunctionId3,
      industri: x.IndustryName,
      industriId: x.IndustryId,
      industriDesc: x.IndustryOther,
      tahunMulai: x.StartDate,
      tahunSelesai: x.EndDate,
      gajiTerakhir: x.MonthlySalary,
      jumlahBawahan: x.JumlahBawahan,
      readMoreJob: false,
      readMoreImprove: false,
    })),

    problemSituasi: response.pengalaman.ProblemSituasi,
    problemTugas: response.pengalaman.ProblemTugas,
    problemTindakan: response.pengalaman.ProblemTindakan,
    problemHasil: response.pengalaman.ProblemHasil,
    obstacleSituasi: response.pengalaman.ObstacleSituasi,
    obstacleTugas: response.pengalaman.ObstacleTugas,
    obstacleTindakan: response.pengalaman.ObstacleTindakan,
    obstacleHasil: response.pengalaman.ObstacleHasil,

    //page3 - freshgrad
    hobby1: CheckHobby(response.hobbyList, 'Membaca Fiksi'),
    hobby2: CheckHobby(response.hobbyList, 'Membaca Non-Fiksi'),
    hobby3: CheckHobby(response.hobbyList, 'Membaca Koran/Artikel Berita'),
    hobby4: CheckHobby(response.hobbyList, 'Kegiatan Investasi'),
    hobby5: CheckHobby(response.hobbyList, 'Menulis'),
    hobby6: CheckHobby(response.hobbyList, 'Menggambar/Melukis'),
    hobby7: CheckHobby(response.hobbyList, 'Bermain Musik'),
    hobby8: CheckHobby(response.hobbyList, 'Bernyanyi'),
    hobby9: CheckHobby(response.hobbyList, 'Olahraga Kompetitif'),
    hobby10: CheckHobby(response.hobbyList, 'Olahraga Non-Kompetitif'),

    socialActivity1: MappSosialActivity(response.socialActivityList, "Menghadiri komunikasi sosial"),
    socialActivity2: MappSosialActivity(response.socialActivityList, "Menghadiri komunitas yang berkaitan dengan hobi (klub)"),
    socialActivity3: MappSosialActivity(response.socialActivityList, "Mengikuti aktivitas sukarela (voulenteering)"),
    socialActivity4: MappSosialActivity(response.socialActivityList, "Mengunjungi museum/pameran/pertunjukan"),
    socialActivity5: MappSosialActivity(response.socialActivityList, "Melakukan aktivitas rekreasional (contoh: berbelanja, travelling, dll.)"),
    socialActivity6: MappSosialActivity(response.socialActivityList, "Arisan dengan teman/kenalan"),
    socialActivity7: MappSosialActivity(response.socialActivityList, "Menongkrong dengan teman/kenalan"),
    socialActivity8: MappSosialActivity(response.socialActivityList, "Mengikuti kegiatan keagamaan"),
    socialActivity9: MappSosialActivity(response.socialActivityList, "Menghadiri pesta"),
    socialActivity10: MappSosialActivityOther(response.socialActivityList),
    socialActivityOthers: MappSosialActivityOther(response.socialActivityList, false),
    // tableActivityPriorityJob:response.socialActivityList,

    salary: response.personalData.salaryId,
    dateAvailable: response.WorkInterest.DateAvailable !== undefined ? response.WorkInterest.DateAvailable !== null ? moment(response.WorkInterest.DateAvailable, 'DD/MM/YYYY') : '' : '',
    placementAvailibility: response.WorkInterest.PlacementAvailability ? 'Bersedia' : 'Tidak Bersedia',
    city1: MappCity(response.WorkInterest.CityList, "Depok, Tangerang, Bekasi, Bogor"),
    city2: MappCity(response.WorkInterest.CityList, "Pulau Jawa (Non-Jabodetabek)"),
    city3: MappCity(response.WorkInterest.CityList, "Pulau Sumatera"),
    city4: MappCity(response.WorkInterest.CityList, "Pulau Kalimantan"),
    city5: MappCity(response.WorkInterest.CityList, "Pulau Sulawesi"),
    city6: MappCity(response.WorkInterest.CityList, "Pulau Bali & Nusa Tenggara"),
    city7: MappCity(response.WorkInterest.CityList, "Papua & Kepulauan Maluku"),

    activityPriority1: MappActivityPriority(response.WorkInterest.AcitivityPriorityList, dataDummy.ActivityPriority.activity1),
    activityPriority2: MappActivityPriority(response.WorkInterest.AcitivityPriorityList, dataDummy.ActivityPriority.activity2),
    activityPriority3: MappActivityPriority(response.WorkInterest.AcitivityPriorityList, dataDummy.ActivityPriority.activity3),
    activityPriority4: MappActivityPriority(response.WorkInterest.AcitivityPriorityList, dataDummy.ActivityPriority.activity4),
    activityPriority5: MappActivityPriority(response.WorkInterest.AcitivityPriorityList, dataDummy.ActivityPriority.activity5),
    activityPriority6: MappActivityPriority(response.WorkInterest.AcitivityPriorityList, dataDummy.ActivityPriority.activity6),
    // activityPriority7: MappActivityPriority(response.WorkInterest.AcitivityPriorityList, dataDummy.ActivityPriority.activity7),

    tableActivityPriority: response.WorkInterest.AcitivityPriorityList,

    jobPriority1: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority1),
    jobPriority2: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority2),
    jobPriority3: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority3),
    jobPriority4: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority4),
    jobPriority5: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority5),
    jobPriority6: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority6),
    jobPriority7: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority7),
    jobPriority8: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority8),
    jobPriority9: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority9),
    jobPriority10: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority10),
    jobPriority11: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority11),
    jobPriority12: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority12),
    jobPriority13: MapJobPriority(response.WorkInterest.JobPriorityList, dataDummy.JobPriority.jobPriority13),
    jobPriority14: MapJobPriorityOther(response.WorkInterest.JobPriorityList),
    jobPriorityOthers: MapJobPriorityOther(response.WorkInterest.JobPriorityList, false),

    tableActivityPriorityJob: response.WorkInterest.JobPriorityList.map(x => ({
      ...x,
      JobPriorityId: x.JobPriorityId,
      JobPriorityText: x.JobPriorityOther ? "Lainnya" : x.JobPriorityText,
      JobPriorityOther: x.JobPriorityOther
    })),

    tablePsychotest: response.psychotestList.map(x => ({
      PsychotestExperienceId: x.PsychotestExperienceId,
      psychotestDate: x.PsychoTestDate,
      psychotestOrganizer: x.PsychoTestOrganizer,
      psychotestPurpose: x.PsychoTestPurpose,
    })),

    //Pro hire - page 3
    facility1: MappFacility(response.facilityList, "Makanan & Minuman"),
    facility2: MappFacility(response.facilityList, "Kendaraan Operasional (CPO/Pinjem)"),
    facility3: MappFacility(response.facilityList, "Asuransi Kesehatan"),
    facility4: MappFacility(response.facilityList, "Asuransi Jiwa"),
    facility5: MappFacility(response.facilityList, "Dana Pensiun"),
    facility6: MappFacility(response.facilityList, "Insentif/Bonus"),
    facility7: MappFacility(response.facilityList, "Kebugaran (gym)"),
    facility8: MappFacility(response.facilityList, "Transportasi (Co: bensin, parkir, tol, dll.)"),
    facility9: MappFacility(response.facilityList, "Tunjangan Hari Raya (THR)"),
    facility10: MappFacility(response.facilityList, "Pelatihan"),
    facility11: MappFacility(response.facilityList, "Tunjangan Jabatan"),
    facility12: MappFacility(response.facilityList, "Tunjangan Cuti"),
    facility13: MappFacility(response.facilityList, "Tunjangan lembur (Co: transportasi, makanan & minuman, dll.)"),
    facility14: MappFacility(response.facilityList, "Program pinjaman/pembiayaan (rumah, pendidikan, kendaraan pribadi, ibadah, dll.)"),
    facility15: MappFacility(response.facilityList, "Tunjangan perjalanan dinas"),
    facility16: MappFacility(response.facilityList, "Tunjangan telekomunikasi (Co: pulsa, kuota, internet, dll.)"),
    facility17: MappFacilityOther(response.facilityList),
    facilityOthers: MappFacilityOther(response.facilityList, false),

    tableReference: response.referenceList.map(x => ({
      referenceName: x.ReferenceName,
      referenceCompany: x.ReferenceCompanyName,
      referenceCompanyId: x.ReferenceCompanyId,
      referenceTitle: x.ReferencePositionTitleName,
      referenceTitleId: x.ReferencePositionTitleId,
      referencePhone: x.ReferencePhone,
      referenceEmail: x.ReferenceEmail,
      referenceRelation: x.ReferenceRelation,
    }))
  }
}