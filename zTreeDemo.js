//1、 setting配置详情
var setting = {
	//显示
	view: {
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		// 大数据量的节点加载请注意：在 addDiyDom 中针对每个节点 查找 DOM 对象并且添加新 DOM 控件，肯定会影响初始化性能；如果不是必须使用，建议不使用此功能
		addDiyDom: addDiyDom,//用于在节点上固定显示用户自定义控件,
		fontCss: setFontCss_ztree, //设置节点的颜色
		expandSpeed: "slow",//节点展开、折叠时的动画速度"slow","normal","fast"
		nameIsHTML:false,//name是否支持html脚本
		txtSelectedEnable: false,//是否可以选择z-tree内的文本
		showIcon: true,//是否显示节点前面的图片信息
		showTitle: true,//鼠标移入是否显示节点内容信息
		showLine:false,// 是否显示节点之间的连线。
		selectedMulti: true, //在复制的时候，是否允许选中多个节点。true为支持，按下ctrl键生效，false不支持。
		dblClickExpand: false, //双击的时候是否切换展开状态。true为切换，false不切换
		autoCancelSelected: true//点击节点时，按下 Ctrl 或 Cmd 键是否允许取消选择操作。
	},
	//增删改，移动复制
	edit: {
		enable: true, //如果enable为false， 进入树组件可以编辑，下面的都不会生效
		editNameSelectAll: true,//节点编辑名称 input 初次显示时,设置 txt 内容是否为全选状态。???
		showRemoveBtn: true, //是否显示树的删除按钮
		showRenameBtn: true, //是否显示数的重命名按钮
		removeTitle: "自定义删除节点名称", //删除按钮Logo的提示
		renameTitle: "自定义编辑节点名称", //修改按钮Logo的提示
		//拖拽
		drag: {
			autoExpandTrigger: false,//拖拽时父节点自动展开是否触发 onExpand 事件回调函数。
			isCopy: true, //能够复制
			isMove: true, //能够移动
			prev: true, //不能拖拽到节点前
			next: true, //不能拖拽到节点后
			inner: true, //只能拖拽到节点中
			minMoveSize: 10,//默认为5判定是否拖拽操作的最小位移值 (单位：px)根据自己的需求可适当调整此值，如果太小容易导致点击鼠标时误操作进行拖拽
		    maxShowNodeNum: 10,//默认为5拖拽多个兄弟节点时，浮动图层中显示的最大节点数。 多余的节点用...代替
		    autoOpenTime: 0,//默认值为500拖拽时父节点自动展开的延时间隔。 (单位：ms)
		    borderMax: 20,//默认为10拖拽节点成为根节点时的 Tree 内边界范围 (单位：px)
		    borderMin: -10//默认为-5拖拽节点成为根节点时的 Tree 外边界范围 (单位：px)。
		    
		}
	},
	//是否被选中
	check:{
		enable:true,
		chkboxType: { "Y": "p", "N": "s" }//checkbox 勾选操作，只影响父级节点；取消勾选操作，只影响子级节点
	},
	//异步
	async: {
		enable: true, //开启异步加载
		type: "get",
		//url: holly.getPath() + "/rest/treeCode/showZtreeSyncRest",
		contentType: "application/json",//设置 Ajax 提交参数的数据类型为 JSON 格式
		dataType: "text",//设置 Ajax 获取的数据类型为 纯文本
		autoParam: ["id"], //异步加载数据，自动添加id参数，会自动获取当前节点的id值,然后根据id值加载该id下的子节点
		//otherParam: ["id", "1", "name", "test"],//进行异步加载时，将提交参数 id=1&name=test
		dataFilter: filter, //对返回数据进行预处理
		otherParam: {
			"id": "1",
			"code_name": "固网测试"
		} //提交的时候就会提交参数id=1&code_name=固网测试
	},
	data: {
		key: {
			name: "name" //节点显示的值
		},
		//
		simpleData: {
			enable: true, //如果为true，可以直接把从数据库中得到的List集合自动转换为Array格式。而不必转换为json传递
			idKey: "id", //节点的id
			pIdKey: "pId", //节点的父节点id
			rootPId: null
		}
	},
	//回调函数
	callback: {
		//beforeDrag: beforeDrag, //拖拽之前
		//beforeDrop: beforeDrop, //拖拽结束
		//onDrop: zTreeOnDrop, //拖拽结束后
		//onDrag: zTreeOnDrag,//拖拽的时候
		//beforeRemove: zTreeBeforeRemove, //删除节点前
		//onRemove: zTreeOnRemove, //节点删除之后
		//beforeEditName: zTreeBeforeEditName, //进行编辑之前
		//beforeRename: zTreeBeforeRename,//重命名节点之前
		//onRename: zTreeOnRename,//重命名之后
		//onClick: zTreeOnClick, //点击
		//onRightClick: zTreeOnRightClick, //右键
		onAsyncSuccess: zTreeOnAsyncSuccess //异步加载
			//beforeExpand: beforeExpand,//展开节点前
			//onAsyncSuccess: onAsyncSuccess,//异步数据加载成功的回调
			//onAsyncError: onAsyncError //异步数据加载错误后回调
	}
};

//初始化树
zTree = $.fn.zTree.init($("#busTree"), setting,treeData);
//获取树对象
var treeObj = $.fn.zTree.getZTreeObj("busTree");
var nodes = treeObj.getNodes();
treeObj.updateNode(zTree.getSelectedNodes()[0]);
console.log(nodes);